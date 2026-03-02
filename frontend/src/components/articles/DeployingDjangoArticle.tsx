import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function Code({ code, language = 'bash' }: { code: string; language?: string }) {
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

export default function DeployingDjangoArticle() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="mb-3 font-mono text-sm text-slate-600">Nov 30, 2025</p>

      <h1 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-slate-100 md:text-3xl">
        The Complete Guide to Deploying Django on Rocky Linux 10: From Zero to Production
      </h1>

      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
          AK
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">Abhay Kanwasi</p>
          <a
            href="https://medium.com/@abhaykanwasi/the-complete-guide-to-deploying-django-on-rocky-linux-10-from-zero-to-production-1806a82cb06d"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-slate-500 transition-colors hover:text-cyan-400"
          >
            Read on Medium
          </a>
        </div>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-slate-300">
        <p>
          Deploying a Django application can feel overwhelming, especially when you're faced with a
          fresh Linux server and countless configuration options. Having recently gone through this
          process myself, I want to share a battle-tested approach that actually works in production.
        </p>
        <p>
          This guide will walk you through deploying a Django application on Rocky Linux 10,
          covering everything from initial server setup to production-ready configuration with SSL,
          monitoring, and proper security practices.
        </p>

        <Heading>Why This Stack?</Heading>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li><strong className="text-slate-300">Rocky Linux 10:</strong> A stable, enterprise-grade Linux distribution</li>
          <li><strong className="text-slate-300">PostgreSQL 16:</strong> Robust database with excellent Django support</li>
          <li><strong className="text-slate-300">Nginx + Gunicorn:</strong> Proven combination for serving Django applications</li>
          <li><strong className="text-slate-300">Python 3.12:</strong> Latest stable version with performance improvements</li>
          <li><strong className="text-slate-300">UV:</strong> Modern Python package manager that's significantly faster than pip</li>
        </ul>

        {/* Phase 1 */}
        <Heading>Phase 1: Laying the Foundation</Heading>
        <p>Before anything, laying a solid foundation is very important.</p>

        <Sub>Initial Server Setup</Sub>
        <Code code={`# Update the system and install basic tools
sudo dnf update -y
sudo dnf install -y nano git bind-utils policycoreutils-python-utils httpd-tools`} />

        <Sub>Configure the Firewall</Sub>
        <Code code={`sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload`} />

        <Sub>SSH Key Setup</Sub>
        <Code code={`cd ~
sudo -u your-project bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N "" -C "deploy@$(hostname)"

echo "=== Copy this public key to your Git provider ==="
cat ~/.ssh/id_ed25519.pub
echo "=== End of public key ==="
exit`} />

        <Sub>Create Dedicated Application User</Sub>
        <Code code={`sudo useradd -r -s /bin/bash -m -d /opt/<your-project> <your-project>
sudo usermod -a -G <your-project> $USER
id <your-project>`} />

        {/* Phase 2 */}
        <Heading>Phase 2: Modern Python Setup</Heading>

        <Sub>Install Latest Stable Python</Sub>
        <Code code={`sudo dnf install -y epel-release
sudo dnf install -y python3.12 python3.12-devel
sudo dnf install -y gcc postgresql-devel openssl-devel`} />

        <Sub>Enter UV: The Game-Changing Package Manager</Sub>
        <Code code={`curl -LsSf https://astral.sh/uv/install.sh | sh
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc`} />

        <Sub>UV Runtime Approach</Sub>
        <p>Instead of relying on system Python, use UV to manage Python versions for consistency and isolation:</p>
        <Code code={`sudo mkdir -p /opt/uv/python
sudo chown -R $USER:$USER /opt/uv

uv python install 3.12
cp -a ~/.local/share/uv/python/cpython-3.12*-linux-x86_64-gnu /opt/uv/python/`} />

        {/* Phase 3 */}
        <Heading>Phase 3: Database Setup</Heading>
        <p>This one is most crucial. Set it up properly because if you don't it will become a headache.</p>

        <Sub>Install PostgreSQL</Sub>
        <Code code={`sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
sudo dnf -qy module disable postgresql
sudo dnf install -y postgresql16-server
sudo /usr/pgsql-16/bin/postgresql-16-setup initdb
sudo systemctl enable postgresql-16
sudo systemctl start postgresql-16`} />

        <Sub>Create Database and User</Sub>
        <Code code={`sudo -u postgres psql`} />
        <Code code={`CREATE USER your_app_user WITH PASSWORD 'secure_password_here';
CREATE DATABASE your_app_db OWNER your_app_user;
GRANT ALL PRIVILEGES ON DATABASE your_app_db TO your_app_user;
ALTER DATABASE your_database_name OWNER TO your_app_user;
ALTER SCHEMA public OWNER TO your_app_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO your_app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO your_app_user;`} language="sql" />

        <Sub>Configure PostgreSQL Authentication</Sub>
        <Code code={`sudo nano /var/lib/pgsql/16/data/pg_hba.conf

# Add these lines BEFORE the final "reject all" line:
host    your_app_db    your_app_user    127.0.0.1/32    md5
local   your_app_db    your_app_user                    md5

sudo systemctl restart postgresql-16`} />

        {/* Phase 4 */}
        <Heading>Phase 4: Application Deployment</Heading>

        <Sub>Clone and Configure Your Project</Sub>
        <Code code={`sudo mkdir -p /opt/your-project
sudo chown $USER:$USER /opt/your-project
cd /opt/your-project

git clone your-repository-url .
git checkout production-branch`} />

        <Sub>Environment Configuration</Sub>
        <Code code={`# nano .env
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,your_server_ip
DB_ENGINE=django.db.backends.postgresql
DB_NAME=your_app_db
DB_USER=your_app_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432`} />
        <Code code={`chmod 600 /opt/your-project/.env
sudo chown root:<your-project> /opt/your-project/.env`} />

        <Sub>Set Up Virtual Environment & Install Dependencies</Sub>
        <Code code={`/opt/uv/python/cpython-3.12*-linux-x86_64-gnu/bin/python3.12 -m venv .venv
source .venv/bin/activate

# UV is significantly faster than pip
uv sync  # or pip install -r requirements.txt

python manage.py makemigrations
python manage.py check --database default
python manage.py migrate
python manage.py collectstatic --no-input`} />

        <Sub>Set Static File Permissions</Sub>
        <Code code={`sudo chown -R your-project:nginx /opt/your-project/staticfiles
sudo chown -R your-project:nginx /opt/your-project/media
sudo chmod -R 755 /opt/your-project/staticfiles
sudo chmod -R 755 /opt/your-project/media`} />

        {/* Phase 5 & 6 */}
        <Heading>Phase 5 & 6: Nginx Configuration</Heading>

        <Code code={`sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx`} />

        <p>Add rate limiting in <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-cyan-300">/etc/nginx/nginx.conf</code> inside the <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-cyan-300">http</code> block:</p>
        <Code code={`limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/s;
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;`} language="nginx" />

        <Sub>Site Configuration</Sub>
        <Code code={`sudo tee /etc/nginx/conf.d/your-project.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    limit_req zone=api_limit burst=200 nodelay;
    limit_conn conn_limit 50;

    location /static/ {
        alias /opt/your-project/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /opt/your-project/media/;
        expires 6M;
        add_header Cache-Control "public";
    }

    location / {
        proxy_pass http://unix:/run/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo nginx -t
sudo systemctl reload nginx`} language="nginx" />

        {/* Phase 7 */}
        <Heading>Phase 7: Systemd Service Configuration</Heading>
        <p>
          If we stop the VM and restart it, our site won't be live automatically. We need systemd services for that.
        </p>

        <Sub>Gunicorn Service</Sub>
        <Code code={`sudo tee /etc/systemd/system/gunicorn.service > /dev/null <<'EOF'
[Unit]
Description=gunicorn daemon for Django
After=network.target postgresql-16.service
Wants=postgresql-16.service

[Service]
User=your-project
Group=your-project
WorkingDirectory=/opt/your-project
Environment="PATH=/opt/your-project/.venv/bin"
Environment="DJANGO_SETTINGS_MODULE=your_project.settings"
EnvironmentFile=/opt/your-project/.env
ExecStart=/opt/your-project/.venv/bin/gunicorn \\
    --workers 3 \\
    --threads 2 \\
    --worker-class gthread \\
    --bind unix:/run/gunicorn/your-project.sock \\
    --access-logfile /opt/your-project/logs/gunicorn-access.log \\
    --error-logfile /opt/your-project/logs/gunicorn-error.log \\
    your_project.wsgi:application
Restart=on-failure
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/opt/your-project/logs /opt/your-project/media

[Install]
WantedBy=multi-user.target
EOF`} />

        <Sub>Gunicorn Socket</Sub>
        <Code code={`sudo tee /etc/systemd/system/gunicorn.socket > /dev/null <<'EOF'
[Unit]
Description=gunicorn socket for Django
PartOf=gunicorn.service

[Socket]
ListenStream=/run/gunicorn/your-project.sock
SocketUser=nginx
SocketGroup=your-project
SocketMode=0660

[Install]
WantedBy=sockets.target
EOF

sudo mkdir -p /run/gunicorn
sudo chown your-project:nginx /run/gunicorn

sudo systemctl daemon-reload
sudo systemctl enable --now gunicorn.socket
sudo systemctl enable --now gunicorn`} />

        {/* Phase 8 */}
        <Heading>Phase 8: Security Hardening</Heading>

        <Sub>SELinux Configuration</Sub>
        <Code code={`sudo setsebool -P httpd_can_network_connect on
sudo setenforce 1`} />

        <Sub>SSL with Let's Encrypt</Sub>
        <Code code={`sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com \\
    --agree-tos --email your-email@example.com \\
    --non-interactive --redirect`} />

        <Sub>Log Rotation</Sub>
        <Code code={`sudo tee /etc/logrotate.d/django-app > /dev/null << EOF
/opt/your-project/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 640 your-project your-project
    sharedscripts
    postrotate
        systemctl kill -s USR1 gunicorn.service 2>/dev/null || true
        systemctl reload nginx 2>/dev/null || true
    endscript
}
EOF`} />

        {/* Phase 9 */}
        <Heading>Phase 9: Verification & Monitoring</Heading>
        <Code code={`# Check all services
sudo systemctl status nginx
sudo systemctl status gunicorn
sudo systemctl status postgresql-16

# Verify socket
sudo ls -la /run/gunicorn.sock

# Test application
curl -I https://yourdomain.com

# Real-time monitoring
sudo tail -f /var/log/nginx/error.log
sudo journalctl -u gunicorn -f`} />

        <Heading>Future-Proofing: Python Version Upgrades</Heading>
        <Code code={`cd /opt/your-project

# Install new Python version
uv python install 3.13

# Copy to system runtime
cp -a ~/.local/share/uv/python/cpython-3.13*-linux-x86_64-gnu /opt/uv/python/

# Test before deploying
/opt/uv/python/cpython-3.13*-linux-x86_64-gnu/bin/python3.13 -m venv .venv-test
source .venv-test/bin/activate
python manage.py check --database default

# If successful, swap
deactivate
mv .venv .venv-backup && mv .venv-test .venv
sudo systemctl restart gunicorn`} />

        <Heading>TL;DR — Security Hardening Checklist</Heading>
        <p>A concise, repeatable checklist that covers:</p>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>Firewalld rules & port restrictions</li>
          <li>Disable unused services (cockpit, avahi, rpcbind)</li>
          <li>Kernel hardening (sysctl — IP spoofing, TCP syncookies)</li>
          <li>SSH hardening (pubkey auth, disable root login)</li>
          <li>SELinux enforcement & file contexts</li>
          <li>Nginx security headers (HSTS, X-Frame-Options, CSP)</li>
          <li>Rate limiting & connection limits</li>
          <li>Fail2Ban brute-force protection</li>
          <li>Django production settings (HTTPS, secure cookies, CSRF)</li>
          <li>File & service permissions lockdown</li>
          <li>SSL certificate permissions & symlink traversal</li>
          <li>Log rotation & backup strategy</li>
        </ul>

        <Sub>Django Production Settings</Sub>
        <Code code={`DEBUG = False
ALLOWED_HOSTS = ["yourdomain.com"]
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"`} language="python" />

        <Sub>Nginx Security Headers</Sub>
        <Code code={`add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Cross-Origin-Opener-Policy "same-origin-allow-popups" always;`} language="nginx" />

        <Sub>Fail2Ban SSH Jail</Sub>
        <Code code={`# /etc/fail2ban/jail.d/ssh.local
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/secure
maxretry = 5
bantime = 3600`} />

        <Heading>Final Checklist</Heading>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>All services running without errors</li>
          <li>SSL certificate is active and valid</li>
          <li>Static files are serving correctly</li>
          <li>Database connections are working</li>
          <li>Rate limiting is active</li>
          <li>SELinux is properly configured</li>
          <li>No critical errors in logs</li>
          <li>Domain resolves correctly</li>
          <li>Python version is as expected (3.12.x)</li>
          <li>No unnecessary ports are open</li>
        </ul>

        <p className="mt-6 text-slate-500">
          Remember: Security is an ongoing process — regular monitoring and updating are necessary.
        </p>
      </div>
    </article>
  )
}
