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

export default function GoogleAuthArticle() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="mb-3 font-mono text-sm text-slate-600">Aug 28, 2025</p>

      <h1 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-slate-100 md:text-3xl">
        Building Google Authentication with JWT in Django and React
      </h1>

      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
          AK
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">Abhay Kanwasi</p>
          <a
            href="https://medium.com/@abhaykanwasi/building-google-authentication-with-jwt-in-django-and-react-a2f71ec02432"
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
          In this article, we'll walk through how to implement Google OAuth authentication alongside
          traditional email/password login in a Django REST API with a React frontend. We'll be
          using JWT (JSON Web Tokens) for session management, making our authentication system both
          secure and scalable.
        </p>
        <p>
          This implementation is particularly valuable because it doesn't break your existing
          authentication flow — your current users can continue logging in with email/password while
          new users get the convenience of Google OAuth. Both methods generate the same JWT tokens,
          ensuring consistency across your application.
        </p>

        <Heading>What We're Building</Heading>
        <p>Our authentication system supports two ways for users to sign in:</p>
        <ol className="list-inside list-decimal space-y-1 pl-2 text-slate-400">
          <li><strong className="text-slate-300">Google OAuth:</strong> Users sign in with their Google account</li>
          <li><strong className="text-slate-300">Traditional login:</strong> Users register with email and password</li>
        </ol>
        <p>
          Both methods generate the same JWT tokens, ensuring a consistent experience across your
          application.
        </p>

        {/* Backend */}
        <Heading>Backend Implementation (Django)</Heading>

        <Sub>1. Setting Up the URLs</Sub>
        <Code code={`from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', login, name='login'),
    path('api/register/', register, name='register'),
    path('api/auth/google/', google_login, name='google_login'),
]`} />
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li><code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">api/auth/google/</code> — Our new Google OAuth endpoint</li>
          <li><code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">api/login/</code> and <code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">api/register/</code> — Traditional authentication</li>
          <li><code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">api/token/refresh/</code> — Refreshes expired access tokens</li>
        </ul>

        <Sub>2. User Model Extensions</Sub>
        <p>Extend your user model to support Google authentication:</p>
        <Code code={`class CustomUser(models.Model):
    # ... other fields ...
    auth_provider = models.CharField(max_length=50, default='email')
    google_id = models.CharField(max_length=100, blank=True, null=True)`} />
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li><code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">google_id</code>: Stores the unique Google user ID for future logins</li>
          <li><code className="rounded bg-slate-800 px-1 text-xs text-cyan-300">auth_provider</code>: Tracks how the user registered (email or google)</li>
        </ul>

        <Sub>3. Google Token Verification</Sub>
        <Code code={`class GoogleLoginSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)

    def validate_token(self, token):
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_OAUTH2_CLIENT_ID
            )

            if idinfo['iss'] not in [
                'accounts.google.com',
                'https://accounts.google.com'
            ]:
                raise serializers.ValidationError('Wrong issuer.')

            return idinfo
        except Exception as e:
            raise serializers.ValidationError('Invalid token.')`} />
        <p>This serializer takes the Google ID token from the frontend, verifies it with Google's servers, and returns the user information if valid.</p>

        <Sub>4. Creating or Finding Users</Sub>
        <Code code={`def create(self, validated_data):
    idinfo = validated_data['token']
    email = idinfo.get('email')
    google_id = idinfo.get('sub')
    first_name = idinfo.get('given_name', '')
    last_name = idinfo.get('family_name', '')

    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            "first_name": first_name,
            "last_name": last_name,
            "auth_provider": "google",
            "google_id": google_id,
        }
    )

    if not created:
        if not user.google_id:
            user.google_id = google_id
        if user.auth_provider != "google":
            user.auth_provider = "google"
        user.save()

    if not user.has_usable_password():
        user.set_unusable_password()
        user.save()

    return user`} />
        <p>This smart logic creates new users for first-time Google sign-ins, updates existing email users, and sets an unusable password since Google handles authentication.</p>

        <Sub>5. The Google Login View</Sub>
        <Code code={`@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    try:
        serializer = GoogleLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response({
                'access': str(access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )`} />

        <Sub>6. Configuration</Sub>
        <Code code={`# settings.py
GOOGLE_OAUTH2_CLIENT_ID = 'your-google-client-id'`} />

        {/* Frontend */}
        <Heading>Frontend Implementation (React)</Heading>

        <Sub>1. Installing Dependencies</Sub>
        <Code code={`npm install @react-oauth/google`} language="bash" />
        <Code code={`# .env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com`} language="bash" />

        <Sub>2. API Integration</Sub>
        <Code code={`export interface GoogleLoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const googleLogin = async (
  token: string
): Promise<GoogleLoginResponse> => {
  try {
    const response = await axios.post(
      \`\${API_BASE_URL}/api/auth/google/\`,
      { token }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error?.[0] || 'Google login failed'
      );
    }
    throw new Error('Network error occurred');
  }
};`} language="typescript" />

        <Sub>3. Integrating Google Login into Your Forms</Sub>
        <Code code={`import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../api/auth';

const LoginPage: React.FC = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse?.credential) {
      setError('No credential received from Google');
      return;
    }
    setIsGoogleLoading(true);
    setError('');

    try {
      const response = await googleLogin(
        credentialResponse.credential
      );
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      window.location.href = '/dashboard';
    } catch (error: any) {
      setError(error.message || 'Google login failed');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
    >
      <div className="login-container">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
          disabled={isGoogleLoading}
        />

        <div className="divider">
          <span>or continue with email</span>
        </div>

        {/* Your existing email/password form */}
      </div>
    </GoogleOAuthProvider>
  );
};`} language="typescript" />

        <Sub>4. Smart Registration Flow</Sub>
        <p>Google users skip email verification and go straight to the dashboard, while email users follow the traditional registration flow:</p>
        <Code code={`const handleGoogleSuccess = async (credentialResponse: any) => {
  setIsGoogleLoading(true);

  try {
    const response = await googleLogin(
      credentialResponse.credential
    );
    // Google users are pre-verified
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    // Redirect directly — no email verification needed
    window.location.href = '/dashboard';
  } catch (error: any) {
    setError(error.message || 'Google registration failed');
  } finally {
    setIsGoogleLoading(false);
  }
};`} language="typescript" />

        {/* How it works */}
        <Heading>How It All Works Together</Heading>
        <p>The complete flow when a user clicks "Continue with Google":</p>
        <ol className="list-inside list-decimal space-y-1 pl-2 text-slate-400">
          <li>Google OAuth popup opens</li>
          <li>User authenticates with Google</li>
          <li>Frontend receives ID token from Google</li>
          <li>Frontend sends token to our Django API</li>
          <li>Backend verifies token with Google servers</li>
          <li>Backend creates/finds user in database</li>
          <li>Backend generates JWT tokens</li>
          <li>Frontend receives JWT tokens and user info</li>
          <li>User is logged in!</li>
        </ol>

        {/* Benefits */}
        <Heading>Key Benefits</Heading>

        <Sub>Security</Sub>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>We verify every token with Google's servers</li>
          <li>JWT tokens provide stateless authentication</li>
          <li>Google handles password security and two-factor authentication</li>
          <li>Existing security measures remain in place</li>
        </ul>

        <Sub>User Experience</Sub>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>One-click login for users who prefer it</li>
          <li>No need to remember another password for Google users</li>
          <li>Traditional login still available</li>
          <li>Automatic account linking for existing users</li>
        </ul>

        <Sub>Development Benefits</Sub>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>Maintains your existing API structure</li>
          <li>Same JWT token format for all authentication methods</li>
          <li>Easy to extend with other OAuth providers (Facebook, GitHub, etc.)</li>
          <li>Non-breaking changes to existing codebase</li>
        </ul>

        {/* Common challenges */}
        <Heading>Common Challenges and Solutions</Heading>

        <Sub>CORS Configuration</Sub>
        <Code code={`CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your React dev server
    # Add your production domains
]`} />

        <Sub>Google Console Configuration</Sub>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>Authorized redirect URIs are properly set</li>
          <li>Authorized JavaScript origins include your domain</li>
          <li>OAuth 2.0 Client ID is created</li>
        </ul>

        <Heading>Security Considerations</Heading>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>Regularly rotate your secrets</li>
          <li>Use HTTPS in production</li>
          <li>Set appropriate token expiration times</li>
          <li>Validate tokens on every request</li>
          <li>Keep your Google Client Secret secure</li>
        </ul>

        <Heading>Conclusion</Heading>
        <p>
          This implementation gives you a robust, non-breaking authentication system that enhances
          user experience without disrupting existing functionality. The key success factors are
          consistency (same JWT tokens regardless of login method), flexibility (users choose their
          preferred auth method), and smart UX (Google users skip verification, email users follow
          the traditional flow).
        </p>
        <p>
          The system is also future-proof — want to add Facebook or GitHub login? Just create similar
          serializers and views following the same pattern.
        </p>
      </div>
    </article>
  )
}
