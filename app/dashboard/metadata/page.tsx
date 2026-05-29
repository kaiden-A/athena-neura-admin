'use client'

export default function MetadataPage() {
  return (
    <div className="fade-in">
      <h2 className="text-lg font-semibold text-accent mb-4">Metadata / API Schema</h2>
      <p className="text-xs text-muted mb-4">
        The LLM consumption endpoint returns public, verified FAQs grouped by folder for efficient ingestion.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Endpoint
          </label>
          <div className="bg-[#eef2ff] text-indigo-600 font-mono text-sm rounded-lg px-4 py-3 border border-[#c7d2fe]">
            GET /api/v2/faqs?format=athena-neura-optimized
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Response Schema
          </label>
          <pre className="bg-[#eef2ff] text-indigo-600 font-mono text-xs rounded-lg px-4 py-3 border border-[#c7d2fe] overflow-x-auto leading-relaxed">
{`{
  "folders": [
    {
      "folder": {
        "id": "developer-apis",
        "title": "Developer APIs",
        "badge": "DEV-03",
        "description": "...",
        "preset": "light",
        "icon": "folder"
      },
      "faqs": [
        {
          "id": "faq-7",
          "folderId": "developer-apis",
          "question": "What is the rate limit?",
          "answer": "Standard tier: 1,000 requests/hour.",
          "isVerified": true,
          "visibility": "public"
        }
      ]
    }
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
