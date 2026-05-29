import type { KnowledgeFolder, FAQArticle, User, LogEntry } from './types'

export const seedFolders: KnowledgeFolder[] = [
  {
    id: 'authentication',
    title: 'Authentication',
    badge: 'AUTH-01',
    description: 'Login, SSO, OAuth, token management and session handling.',
    preset: 'dark',
    icon: 'shield',
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    badge: 'BILL-02',
    description: 'Invoices, payment methods, subscriptions and refund policies.',
    preset: 'blue',
    icon: 'credit-card',
  },
  {
    id: 'developer-apis',
    title: 'Developer APIs',
    badge: 'DEV-03',
    description: 'REST endpoints, rate limits, webhooks and SDK references.',
    preset: 'light',
    icon: 'folder',
  },
]

export const seedFAQs: FAQArticle[] = [
  {
    id: 'faq-1',
    folderId: 'authentication',
    question: 'How do I reset my password?',
    answer: 'Navigate to Settings > Security > Password. Click "Reset Password" and follow the email instructions. The link expires in 24 hours.',
    isVerified: true,
    visibility: 'public',
    createdAt: '2026-05-01T10:00:00Z',
    updatedAt: '2026-05-15T14:30:00Z',
  },
  {
    id: 'faq-2',
    folderId: 'authentication',
    question: 'What SSO providers are supported?',
    answer: 'We support Okta, Azure AD, Google Workspace, and OneLogin. Contact support to configure your identity provider.',
    isVerified: true,
    visibility: 'public',
    createdAt: '2026-05-02T10:00:00Z',
    updatedAt: '2026-05-16T14:30:00Z',
  },
  {
    id: 'faq-3',
    folderId: 'authentication',
    question: 'How long do session tokens last?',
    answer: 'Session tokens expire after 24 hours by default. Refresh tokens are valid for 30 days and can be rotated.',
    isVerified: false,
    visibility: 'private',
    createdAt: '2026-05-03T10:00:00Z',
  },
  {
    id: 'faq-4',
    folderId: 'billing',
    question: 'How do I update my billing information?',
    answer: 'Go to Billing > Payment Methods. You can add, remove, or update credit cards and bank accounts.',
    isVerified: true,
    visibility: 'public',
    createdAt: '2026-05-04T10:00:00Z',
    updatedAt: '2026-05-17T14:30:00Z',
  },
  {
    id: 'faq-5',
    folderId: 'billing',
    question: 'What happens if my payment fails?',
    answer: 'We attempt the charge 3 times over 5 days. After that, your account is downgraded to free tier. Past-due invoices must be paid within 15 days.',
    isVerified: true,
    visibility: 'public',
    createdAt: '2026-05-05T10:00:00Z',
  },
  {
    id: 'faq-6',
    folderId: 'billing',
    question: 'Can I get a refund?',
    answer: 'Annual plans are refundable within 30 days of purchase, prorated. Monthly plans are non-refundable.',
    isVerified: false,
    visibility: 'private',
    createdAt: '2026-05-06T10:00:00Z',
  },
  {
    id: 'faq-7',
    folderId: 'developer-apis',
    question: 'What is the rate limit for API requests?',
    answer: 'Standard tier: 1,000 requests/hour. Pro tier: 10,000 requests/hour. Enterprise: custom limits available.',
    isVerified: true,
    visibility: 'public',
    createdAt: '2026-05-07T10:00:00Z',
    updatedAt: '2026-05-18T14:30:00Z',
  },
  {
    id: 'faq-8',
    folderId: 'developer-apis',
    question: 'How do I authenticate API requests?',
    answer: 'Include your API key in the Authorization header: Bearer YOUR_API_KEY. Keys are generated in Developer > API Keys.',
    isVerified: true,
    visibility: 'public',
    createdAt: '2026-05-08T10:00:00Z',
  },
]

export const seedUsers: User[] = [
  { email: 'admin@motionu.com', name: 'Admin User', verified: true },
]

export const hashedPassword = 'admin123'

export const seedLogs: LogEntry[] = [
  { timestamp: '2026-05-29 08:00:00', level: 'INFO', message: 'System started. Knowledge base loaded.' },
  { timestamp: '2026-05-29 08:00:01', level: 'OK', message: 'Database connection established.' },
  { timestamp: '2026-05-29 08:15:23', level: 'INFO', message: 'FAQ cache refreshed (24 articles).' },
  { timestamp: '2026-05-29 09:00:00', level: 'INFO', message: 'Scheduled health check passed.' },
  { timestamp: '2026-05-29 09:30:45', level: 'WARN', message: 'Rate limit approaching threshold for API key dev-abc123.' },
  { timestamp: '2026-05-29 10:00:00', level: 'ERROR', message: 'LLM query timed out after 30s. Retrying...' },
  { timestamp: '2026-05-29 10:00:05', level: 'OK', message: 'LLM query succeeded on retry.' },
  { timestamp: '2026-05-29 10:30:00', level: 'INFO', message: 'New folder created: Developer APIs.' },
  { timestamp: '2026-05-29 11:00:00', level: 'INFO', message: 'Full system sync completed.' },
]
