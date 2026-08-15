export const profile = {
  name: 'Abhay Kanwasi',
  role: 'Sr. Software Engineer',
  location: 'India',
  github: 'https://github.com/Abhay-Kanwasi',
  linkedin: 'https://www.linkedin.com/in/abhay-kanwasi/',
  medium: 'https://medium.com/@abhaykanwasi',
  company: {
    name: 'WagerGeeks',
    url: 'https://www.wagergeeks.com/',
  },
}

export const techStack = [
  {
    category: 'languages',
    items: ['Python', 'JavaScript'],
  },
  {
    category: 'frameworks',
    items: ['Django', 'DRF', 'FastAPI', 'Flask', 'Pydantic', 'React.js', 'Next.js', 'ORM'],
  },
  {
    category: 'databases_&_messaging',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ'],
  },
  {
    category: 'async_&_task_queues',
    items: ['Celery', 'Celery-Beat'],
  },
  {
    category: 'devops_&_cloud',
    items: ['Google Cloud', 'Docker', 'Linux', 'Ubuntu', 'Git', 'Microservices'],
  },
  {
    category: 'ai_&_ml',
    items: ['Prompt Engineering', 'RAG', 'LangChain', 'LangGraph'],
  },
  {
    category: 'tools',
    items: ['Postman', 'Cursor', 'VS Code', 'PyCharm'],
  },
]

export const projects = [
  {
    className: 'VzureInnovationAccelerator',
    bullets: [
      'Built a secure upgrade system with signature validation, decryption, and automated application upgrade.',
      'Integrated LDAP and Active Directory authentication with configurable settings, real-time connection testing, and comprehensive frontend and backend test cases.',
    ],
    stack: ['Python', 'Django', 'LDAP', 'Active Directory', 'React'],
    liveLink: 'https://vzure.com/',
    sourceCode: '',
  },
  {
    className: 'Finlens',
    bullets: [
      'Designed a configurable storage backend supporting both local and Google Cloud Storage, enforcing AES-256 encryption with customer-supplied keys for all uploaded files.',
      'Separated and migrated compute-heavy tasks from the core app to Google Cloud, deploying via Cloud Run or Artifact Registry with Docker, based on OS dependencies.',
    ],
    stack: ['Python', 'Django', 'Google Cloud Storage', 'Cloud Run', 'Docker', 'Cloud Functions'],
    liveLink: 'https://finlens.hobbiate.com/',
    sourceCode: '',
  },
  {
    className: 'S3Drive',
    bullets: [
      'Architected and deployed a multi-tenant S3 file management platform that enables organizations to browse, upload, download, preview, restore, and govern files across org-scoped AWS S3 buckets through a secure web interface.',
      'Built a secure backend layer between the UI and AWS S3/PostgreSQL, enforcing group-based folder permissions, role-based access control, soft-delete recycle bin workflows, and S3-backed audit logging for enterprise-grade file governance.',
      'Implemented approval-driven admin workflows for sensitive operations such as group deletion and org offboarding, along with in-browser preview support for CSV, XLSX, Parquet, and JSON files using paginated server-side parsing and caching.',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'AWS S3', 'boto3', 'JWT', 'Next.js', 'React.js', 'Tailwind CSS', 'React Query', 'Docker', 'AWS ECS', 'AWS ECR', 'GitHub Actions', 'pandas', 'pyarrow'],
    liveLink: '',
    sourceCode: '',
  },
  {
    className: 'ForecastingAgent',
    bullets: [
      'Architected and deployed a conversational forecasting platform that enables users to submit natural-language demand planning queries and receive interactive Plotly visualizations, structured insights, and downloadable Excel outputs.',
      'Built a Claude-powered tool-calling pipeline that transforms user prompts into forecasting inputs, orchestrates S3-backed data preparation and external model execution, and supports scalable async processing through job workers, polling, cancellation, and AWS AgentCore integration.',
      'Implemented editable, branch-based conversation workflows with chat_id, conversation_id, version switching, and revision handling to support iterative forecasting and what-if analysis.',
    ],
    stack: ['Python', 'FastAPI', 'MongoDB', 'Next.js', 'React.js', 'Redux Toolkit', 'AWS S3', 'AWS AgentCore', 'Anthropic Claude', 'Amazon Bedrock', 'Plotly', 'Docker', 'Langfuse'],
    liveLink: '',
    sourceCode: '',
  },
  {
    className: 'RAAgent',
    bullets: [
      'Architected and deployed a LangGraph-based research analytics agent that allows users to query marketing and ROI datasets through natural language and receive streamed insights, interactive charts, Excel analyses, and markdown reports.',
      'Engineered a dual-path data workflow supporting both user-uploaded CSV/Excel files and governed RROI brand datasets, combining JWT-based access control, S3/Parquet artifact handling, and multi-step LLM orchestration with real-time SSE progress streaming.',
      'Developed a structured analytics workflow for code generation, execution, plot generation, insight synthesis, and report creation, enabling end-to-end research automation from raw data to business-ready outputs.',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'MongoDB', 'PostgreSQL', 'Next.js', 'React.js', 'Redux Toolkit', 'AWS S3', 'AWS ECS', 'Claude', 'Gemini', 'Plotly', 'SSE', 'Docker', 'Langfuse'],
    liveLink: '',
    sourceCode: '',
  },
  {
    className: 'AIQuarium',
    bullets: [
      'Architected and deployed a full-stack AI platform hosting multiple NLP tools — Text Summarizer, parameterized Blog Generator (custom topics, tones, and AI providers), and a Groq-powered chat interface with adjustable model, token limit, and temperature settings.',
      'Seamlessly integrated Hugging Face transformer models alongside the Groq API, dynamically selecting the most effective model per task to maximize accuracy, efficiency, and user-driven customization.',
    ],
    stack: ['Python', 'Django', 'Groq API', 'Hugging Face', 'React', 'NLP', 'Machine Learning'],
    liveLink: '',
    sourceCode: '',
  },
]

export const experiences = [
  {
    role: 'Sr. Software Engineer',
    company: 'WagerGeeks',
    companyUrl: 'https://www.wagergeeks.com/',
    period: 'Jan 2026 — Present',
    location: 'Indore, Madhya Pradesh · Remote',
    timestamp: '2026.01',
    level: 'INFO',
    description:
      'Building high-performing iGaming software solutions at WagerGeeks, developing scalable backend systems for sportsbook platforms, casino game engines, and real-time betting infrastructure.',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'Microservices'],
  },
  {
    role: 'Sr. Software Engineer',
    company: 'Hobbiate',
    companyUrl: 'https://www.hobbiate.com/',
    period: 'Dec 2024 — Jan 2026',
    location: 'Dehradun, Uttarakhand · On-site',
    timestamp: '2024.12',
    level: 'INFO',
    description:
      'Designed, built, and optimized end-to-end systems using Python, Django, React, PostgreSQL, Docker, and Google Cloud Platform. Led development across multiple products (VIA, NeoScaler, Finlens, DCM) ensuring performance, reliability, and clean architecture. Designed and deployed OCR and data parsing pipelines using Google Vision API, Cloud Functions, and async processing. Implemented secure integrations (LDAP/Active Directory, encryption, file signing) and automation for enterprise clients. Set up and maintained CI/CD, containerized deployments, and production environments using Docker and GCP. Mentored junior developers, managed Jira tasks, conducted code reviews, and collaborated directly with U.S.-based clients.',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'GCP', 'Cloud Functions', 'LDAP', 'CI/CD'],
  },
  {
    role: 'Software Engineer',
    company: 'Hobbiate',
    companyUrl: 'https://www.hobbiate.com/',
    period: 'Oct 2023 — Dec 2024',
    location: 'Dehradun, Uttarakhand · On-site',
    timestamp: '2023.10',
    level: 'INFO',
    description:
      'Created a responsive and user-friendly chat interface with real-time message processing and history management. Built comprehensive forms and dashboards for data entry and visualization. Designed and implemented UI components and backend services for dynamic content management, including user profiles, logging, and resource management.',
    skills: ['Python', 'Git', 'Next.js', 'Django', 'Chakra UI', 'MongoDB', 'PostgreSQL', 'LDAP'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Hobbiate',
    companyUrl: 'https://www.hobbiate.com/',
    period: 'Jul 2023 — Oct 2023',
    location: 'Dehradun, Uttarakhand · On-site',
    timestamp: '2023.07',
    level: 'INFO',
    description:
      'Gained proficiency in Django ORM, including implementing and querying complex relationships and conducting unit testing to ensure data integrity. Improved the user interface and user experience by resolving key front-end issues, contributing to a smooth and reliable application experience.',
    skills: ['React', 'PostgreSQL', 'Django', 'Git', 'Ubuntu', 'BitBucket', 'ORM'],
  },
]

export const articles = [
  {
    id: 'exception-handling-python',
    date: 'Jul 18, 2024',
    title: 'Exception Handling in Python',
    description:
      'How exceptions are handled in Python using try, catch and finally with code examples.',
  },
  {
    id: 'google-auth-jwt-django-react',
    date: 'Aug 28, 2025',
    title: 'Building Google Authentication with JWT in Django and React',
    description:
      'Implement Google OAuth alongside traditional login using JWT tokens — non-breaking, secure, and scalable.',
  },
  {
    id: 'deploying-django-rocky-linux',
    date: 'Nov 30, 2025',
    title: 'The Complete Guide to Deploying Django on Rocky Linux 10: From Zero to Production',
    description:
      'A battle-tested, end-to-end guide covering server setup, PostgreSQL, Nginx, Gunicorn, SSL, SELinux, and security hardening.',
  },
  {
    id: 'configurable-storage-django',
    date: 'Apr 26, 2025',
    title: 'Configurable Storage in Django: Seamlessly Switch Between Local and Cloud',
    description:
      'Set up a flexible storage system in Django that switches between local filesystem and Google Cloud Storage with a single setting.',
  },
]

export const navLinks = [
  { label: 'whoami', href: '#whoami' },
  { label: 'tech_stack', href: '#tech-stack' },
  { label: 'projects', href: '#projects' },
  { label: 'experience', href: '#experience' },
  { label: 'articles', href: '#articles' },
  { label: 'contact', href: '#contact' },
]
