import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

let genAIClient: GoogleGenAI | null = null;
function getGenAI() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey: key });
  }
  return genAIClient;
}

function creatorAiPlugin(): Plugin {
  return {
    name: 'creator-ai-plugin',
    configureServer(server) {
      server.middlewares.use('/api/ai-creator-assistant', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(bodyStr || '{}');
            const { action, topic, niche, tone, script } = data;
            const ai = getGenAI();

            if (ai) {
              let systemPrompt = '';
              let userPrompt = '';

              if (action === 'generate-titles') {
                systemPrompt = 'You are an elite YouTube algorithm strategist and title consultant. Return valid JSON only.';
                userPrompt = `Generate 5 viral, high-CTR YouTube titles for a video about "${topic || 'growing on YouTube'}" in the "${niche || 'General'}" niche with a "${tone || 'Curiosity'}" angle.
Format output strictly as JSON with this schema:
{
  "titles": [
    {
      "title": "string (under 60 chars)",
      "predictedCtr": 9.2,
      "characterCount": 42,
      "hookType": "string",
      "whyItWorks": "string"
    }
  ],
  "powerKeywords": ["string", "string", "string"],
  "packagingAdvice": "string"
}`;
              } else if (action === 'analyze-hook') {
                systemPrompt = 'You are a YouTube audience retention doctor specializing in the first 30 seconds drop-off curve. Return valid JSON only.';
                userPrompt = `Analyze this YouTube video intro script:
"""
${script}
"""
Niche: ${niche || 'General'}
Format output strictly as JSON:
{
  "retentionScore": 85,
  "hookVelocity": "string",
  "verdict": "string",
  "flaws": ["string", "string"],
  "strengths": ["string", "string"],
  "rewrites": [
    {
      "style": "In Medias Res",
      "script": "string",
      "visualCues": "string"
    },
    {
      "style": "Curiosity Question Loop",
      "script": "string",
      "visualCues": "string"
    }
  ],
  "proTip": "string"
}`;
              } else if (action === 'brainstorm-ideas') {
                systemPrompt = 'You are a YouTube viral idea producer. Return valid JSON only.';
                userPrompt = `Brainstorm 4 high-potential outlier video ideas for a channel in the "${niche || 'Tech'}" niche targeting rapid growth.
Format strictly as JSON:
{
  "ideas": [
    {
      "title": "string",
      "angle": "string",
      "thumbnailConcept": "string",
      "retentionHook": "string",
      "targetAudience": "string",
      "difficulty": "Beginner | Intermediate | Advanced"
    }
  ]
}`;
              } else {
                res.end(JSON.stringify({ error: 'Unknown action' }));
                return;
              }

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: userPrompt,
                config: {
                  systemInstruction: systemPrompt,
                  responseMimeType: 'application/json',
                },
              });

              const text = response.text;
              res.end(text || JSON.stringify({ error: 'Empty response' }));
              return;
            }

            // Fallback when API key is not yet set
            if (action === 'generate-titles') {
              res.end(JSON.stringify({
                titles: [
                  {
                    title: `I Tested 100 Small Channels (Here's What Blew Up)`,
                    predictedCtr: 9.4,
                    characterCount: 47,
                    hookType: 'Curiosity Gap & Proof',
                    whyItWorks: 'Pairs massive testing volume with a concrete promise for creators.'
                  },
                  {
                    title: `Stop Making This 1 Mistake in 2026`,
                    predictedCtr: 8.9,
                    characterCount: 34,
                    hookType: 'Loss Aversion & Urgency',
                    whyItWorks: 'Triggers creator fear of wasting effort on bad strategy.'
                  },
                  {
                    title: `How 1 Tiny Tweak Doubled My Impressions Overnight`,
                    predictedCtr: 8.7,
                    characterCount: 49,
                    hookType: 'High Leverage Asymmetry',
                    whyItWorks: 'Offers outsized return for minimal friction.'
                  },
                  {
                    title: `The Brutal Truth About YouTube in 2026`,
                    predictedCtr: 8.4,
                    characterCount: 39,
                    hookType: 'Contrarian Reality Check',
                    whyItWorks: 'Positions your channel as raw, authentic, and counter-guru.'
                  },
                  {
                    title: `From 0 to 1,000 Subscribers: The Only 3 Rules`,
                    predictedCtr: 9.1,
                    characterCount: 45,
                    hookType: 'Definitive Roadmap',
                    whyItWorks: 'Simplifies a massive challenge into 3 clear pillars.'
                  }
                ],
                powerKeywords: ['Tested', 'Brutal Truth', 'Overnight', 'Mistake', 'Only Rules'],
                packagingAdvice: 'Keep thumbnail text under 3 words. Contrast thumbnail text against title rather than repeating it.'
              }));
              return;
            }

            if (action === 'analyze-hook') {
              res.end(JSON.stringify({
                retentionScore: 82,
                hookVelocity: 'Moderate-High',
                verdict: 'Good core premise, but needs faster visual escalation in seconds 0-5.',
                flaws: [
                  'Spends the first 4 seconds stating the obvious before introducing the stake.',
                  'Missing immediate pattern interrupt or audio drop on the first word.'
                ],
                strengths: [
                  'Strong curiosity question that directly challenges audience assumptions.',
                  'Clear promise of what viewers will unlock if they stay until the end.'
                ],
                rewrites: [
                  {
                    style: 'In Medias Res (Drop into the action)',
                    script: 'Right now, 92% of creators are killing their video before second 15—and you probably did it in your last upload. Here is the exact fix.',
                    visualCues: 'Hard zoom-in on face at second 0, snap sound effect, red error graphic flashing for 0.4 seconds.'
                  },
                  {
                    style: 'Contrarian Question Loop',
                    script: 'What if everything you were told about the YouTube algorithm is completely backwards? Look at these two retention charts.',
                    visualCues: 'Side-by-side comparison graphics sliding onto screen with whoosh sound effect.'
                  }
                ],
                proTip: 'Never say "Hey guys, welcome back to my channel". The algorithm rewards videos that maintain high retention in seconds 0-30!'
              }));
              return;
            }

            if (action === 'brainstorm-ideas') {
              res.end(JSON.stringify({
                ideas: [
                  {
                    title: 'I Did What Top 1% Channels Do for 30 Days',
                    angle: 'Extreme Self-Experimentation',
                    thumbnailConcept: 'Split screen: Day 1 exhausted vs Day 30 glowing graph with subscriber surge.',
                    retentionHook: 'Starts with the day 30 result, then rewinds to the chaotic day 1 breakdown.',
                    targetAudience: 'Aspiring creators looking for inspiration and concrete workflows.',
                    difficulty: 'Intermediate'
                  },
                  {
                    title: 'The Secret Metric YouTube Won\'t Tell You About',
                    angle: 'Insider Algorithm Breakdown',
                    thumbnailConcept: 'YouTube Studio dashboard with a glowing red highlight circle on a hidden metric.',
                    retentionHook: 'Shows a direct quote from a YouTube product manager.',
                    targetAudience: 'Intermediate creators stuck at the 500-5,000 subscriber plateau.',
                    difficulty: 'Beginner'
                  },
                  {
                    title: 'Fixing A Small Creator\'s Channel Live (Brutal Audit)',
                    angle: 'Real-world Transformation Case Study',
                    thumbnailConcept: 'Face of guest creator looking shocked, big red before-and-after sticker.',
                    retentionHook: 'Reveals the 1 mistake that lost 50,000 views within the first 8 seconds.',
                    targetAudience: 'Any creator who feels their content is great but not getting pushed.',
                    difficulty: 'Advanced'
                  },
                  {
                    title: 'Building A $10,000/mo Channel from Zero (Step-by-Step)',
                    angle: 'High-Value Financial Blueprint',
                    thumbnailConcept: 'Clean studio background, holding a silver play button mockup with breakdown sheet.',
                    retentionHook: 'Lays out the complete spreadsheet within the first 20 seconds.',
                    targetAudience: 'Monetization-focused creators and business builders.',
                    difficulty: 'Intermediate'
                  }
                ]
              }));
              return;
            }

            res.end(JSON.stringify({ error: 'Action not supported' }));
          } catch (err: any) {
            console.error('Creator AI API error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message || 'Internal error' }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), creatorAiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
