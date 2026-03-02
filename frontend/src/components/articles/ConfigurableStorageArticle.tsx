import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function Code({ code, language = 'python' }: { code: string; language?: string }) {
  return (
    <div className="my-5 overflow-hidden rounded-lg border border-slate-700/60">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem 1.25rem',
          background: '#0b0f19',
          fontSize: '0.8rem',
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 mb-4 text-lg font-bold text-slate-100">{children}</h2>
}

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 mb-3 text-base font-semibold text-slate-200">{children}</h3>
}

export default function ConfigurableStorageArticle() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="mb-3 font-mono text-sm text-slate-600">Apr 26, 2025</p>

      <h1 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-slate-100 md:text-3xl">
        Configurable Storage in Django: Seamlessly Switch Between Local and Cloud
      </h1>

      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
          AK
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">Abhay Kanwasi</p>
          <a
            href="https://medium.com/@abhaykanwasi/configurable-storage-in-django-seamlessly-switch-between-local-and-cloud-cf2070bc05a5"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-slate-500 transition-colors hover:text-cyan-400"
          >
            Read on Medium
          </a>
        </div>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-slate-300">
        <Heading>Introduction</Heading>
        <p>
          When building Django applications, handling file storage properly is critical — especially
          when moving from local development to production environments. Locally, storing files on
          disk works fine. But in production, storing files on the server becomes impractical or even
          impossible. The solution? Configurable storage that lets you switch easily between local
          and cloud storage just by changing one setting.
        </p>

        <Heading>Problem Statement</Heading>
        <p>
          Suppose you have a Django project where, instead of saving files into the database, you're
          saving them directly into the local file system. Now, when you deploy this application,
          storing data locally becomes difficult or unscalable. You need cloud storage for production,
          but you also want to retain your simple local setup for development.
        </p>
        <p>
          The solution: configurable storage — switch between local and cloud storage by changing just
          one variable in <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">settings.py</code>.
        </p>

        <Heading>Solution: Step-by-Step Setup</Heading>

        <Sub>1. Set Up Google Cloud Storage (GCS)</Sub>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>From the service account, create a storage bucket</li>
          <li>Create a Service Account</li>
          <li>Go to Google Cloud Platform</li>
        </ul>

        <Sub>2. Download Service Account JSON</Sub>
        <p>After setting up the service account, download its credentials file. It will contain important fields like:</p>
        <Code code={`{
    "type": "service_account",
    "project_id": "<your-project-id>",
    "private_key_id": "<your-private-key-id>"
    // ... other key-values ...
}`} language="json" />

        <Sub>3. Prepare Your Django Project</Sub>
        <p>
          Put the service account JSON file inside the same directory as your <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">manage.py</code> file,
          then update your <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">settings.py</code>:
        </p>
        <Code code={`STORAGE_BACKEND = os.environ.get('STORAGE_BACKEND', 'LOCAL')  # Options: LOCAL or GCS
GS_CREDENTIALS_JSON_FILE = os.environ.get(
    "GOOGLE_AUTHENTICATION_CREDENTIALS",
    "<your-service-account-json>"
)

if STORAGE_BACKEND == 'GCS':
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    GS_BUCKET_NAME = '<your-bucket-name>'
    STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    STATIC_URL = f'https://storage.googleapis.com/{GS_BUCKET_NAME}/static/'

    GS_CREDENTIALS = service_account.Credentials.from_service_account_info(
        info=json.load(open(GS_CREDENTIALS_JSON_FILE, "r"))
    )`} />

        <Sub>4. Create a Configurable Storage Helper</Sub>
        <p>
          Inside your Django app, create a folder called <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">cloud</code> and
          add a file <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">configurable_storage.py</code>:
        </p>
        <Code code={`import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from abc import ABC, abstractmethod
from google.cloud import storage
from django.conf import settings

load_dotenv()
logger = logging.getLogger(__name__)


class AbstractStorageHelper(ABC):
    @abstractmethod
    def get_storage_client(self):
        pass

    @abstractmethod
    def upload_to_storage(self, destination_blob_name, file):
        pass

    @abstractmethod
    def file_exists_in_storage(self, file_path):
        pass

    @abstractmethod
    def download_from_storage(self, source_blob_name):
        pass`} />

        <p className="mt-4">The local storage implementation:</p>
        <Code code={`class ConcreteLocalStorageHelper(AbstractStorageHelper):
    def __init__(self):
        self.base_path = os.environ.get(
            'DJANGO_RUNTIME_DIR', str(Path.home())
        ) + '/'

    def get_storage_client(self):
        os.makedirs(self.base_path, exist_ok=True)
        return self.base_path

    def upload_to_storage(self, destination_blob_name, file):
        full_path = os.path.join(self.base_path, destination_blob_name)
        if os.path.isabs(destination_blob_name):
            full_path = destination_blob_name
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        file.seek(0)
        with open(full_path, 'wb') as f:
            f.write(file.read())
        return full_path

    def file_exists_in_storage(self, file_path):
        full_path = os.path.join(self.base_path, file_path)
        if os.path.isabs(file_path):
            full_path = file_path
        return os.path.exists(full_path)

    def download_from_storage(self, source_blob_name):
        full_path = os.path.join(self.base_path, source_blob_name)
        if os.path.isabs(source_blob_name):
            full_path = source_blob_name
        try:
            with open(full_path, 'rb') as f:
                content = f.read()
            return content
        except Exception as e:
            logger.error(
                f"Failed to download {source_blob_name}: {e}"
            )
            raise`} />

        <p className="mt-4">The Google Cloud Storage implementation:</p>
        <Code code={`class ConcreteGCSStorageHelper(AbstractStorageHelper):
    def get_storage_client(self):
        return storage.Client(credentials=settings.GS_CREDENTIALS)

    def upload_to_storage(self, destination_blob_name, file):
        client = self.get_storage_client()
        bucket = client.bucket(settings.GS_BUCKET_NAME)
        blob = bucket.blob(destination_blob_name)
        generation_match_precondition = 0
        file.seek(0)
        blob.upload_from_file(
            file,
            if_generation_match=generation_match_precondition
        )
        return blob.public_url

    def file_exists_in_storage(self, file_path):
        try:
            client = self.get_storage_client()
            bucket = client.bucket(settings.GS_BUCKET_NAME)
            blob = bucket.blob(file_path)
            return blob.exists()
        except Exception as error:
            logger.error(
                f"Error checking file in GCS: {str(error)}"
            )
            return False

    def download_from_storage(self, source_blob_name):
        client = self.get_storage_client()
        bucket = client.bucket(settings.GS_BUCKET_NAME)
        blob = bucket.blob(source_blob_name)
        return blob.download_as_bytes()`} />

        <p className="mt-4">The factory function to get the right helper based on settings:</p>
        <Code code={`def get_storage_helper():
    from project import settings
    if settings.STORAGE_BACKEND == 'GCS':
        return ConcreteGCSStorageHelper()
    else:
        return ConcreteLocalStorageHelper()`} />

        <Sub>5. How to Use Configurable Storage</Sub>
        <p>
          Now that you have a configurable storage system, switching between local and cloud is simple.
          If <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">STORAGE_BACKEND = GCS</code>,
          files go to your Google Cloud bucket. If <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">STORAGE_BACKEND = LOCAL</code>,
          files stay on your local filesystem.
        </p>
        <Code code={`from cloud.configurable_storage import get_storage_helper

storage_helper = get_storage_helper()

# Upload a file
storage_helper.upload_to_storage(file_destination_path, file)

# Download a file
content = storage_helper.download_from_storage(file_destination_path)`} />

        <Heading>Important Notes</Heading>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>
            Never include the bucket name manually in the <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">file_destination_path</code>
          </li>
          <li>
            <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">file_destination_path</code> can be
            any folder structure like <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">cloud_stored_files/filename.txt</code>
          </li>
          <li>In GCS mode: it creates the same structure inside your Cloud Storage bucket</li>
          <li>In LOCAL mode: it creates the folder structure inside your home directory</li>
        </ul>

        <Heading>Conclusion</Heading>
        <p>
          You now have a fully configurable storage system in Django that effortlessly toggles between
          local and cloud storage with a single settings change. This approach keeps your development
          flexible and your production environment scalable. The abstract base class pattern makes it
          easy to extend — need AWS S3 support? Just implement another concrete helper.
        </p>
      </div>
    </article>
  )
}
