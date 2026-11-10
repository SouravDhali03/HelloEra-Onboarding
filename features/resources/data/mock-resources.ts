import type { Resource, ResourceInput } from "../types"

const mockResourceInputs: ResourceInput[] = [
  {
    id: "study-planning",
    title: "A simple study planning template",
    description:
      "Build a realistic weekly plan that helps you make steady progress.",
    category: "Academic",
    subject: "Study Skills",
    tags: ["Planning", "Productivity"],
    type: "Guide",
    language: "English",
    difficulty: "Beginner",
    author: "HelloEra Learning Team",
    readingTime: 8,
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
    imageUrl:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
    roleRelevance: ["student", "tutor"],
    sections: [
      {
        id: "available-time",
        title: "Start with your available time",
        paragraphs: [
          "A useful plan starts with the time you actually have, not an ideal schedule. Before adding tasks, look at your classes, work, travel, family responsibilities, and the time of day when you can focus best.",
        ],
      },
      {
        id: "weekly-priorities",
        title: "Choose weekly priorities",
        paragraphs: [
          "Choose one or two priorities for the week and turn them into small sessions. A priority is easier to start when it has a clear outcome, such as finishing a problem set or outlining one section of an assignment.",
        ],
      },
      {
        id: "session-structure",
        title: "Structure each session",
        paragraphs: [
          "Give each study session a small amount of structure. Start with a five-minute review, spend most of the session on active practice, and leave the final few minutes for writing down what still feels unclear.",
        ],
      },
      {
        id: "recovery-time",
        title: "Build in recovery time",
        paragraphs: [
          "Build recovery time into the plan. A schedule with no room for delays becomes stressful quickly, while a small buffer lets you move a session without feeling that the entire week has failed.",
        ],
      },
      {
        id: "weekly-review",
        title: "Review what worked",
        paragraphs: [
          "Review your plan at the end of the week and keep what worked. Notice which sessions happened easily, which tasks took longer than expected, and where your plan was too ambitious.",
        ],
      },
      {
        id: "next-week",
        title: "Adjust the next week",
        paragraphs: [
          "Use the next week as an adjustment, not a reset. Keep the habits that helped, remove steps that created friction, and choose one small improvement to test in the next plan.",
        ],
      },
    ],
  },
  {
    id: "interview-preparation",
    title: "A practical interview preparation guide",
    description:
      "A concise checklist for preparing, practising, and following up.",
    category: "Career",
    subject: "Job Search",
    tags: ["Interviews", "Career"],
    type: "Guide",
    language: "English",
    difficulty: "Intermediate",
    author: "Career Guide",
    readingTime: 12,
    publishedAt: "2026-11-06",
    updatedAt: "2026-11-06",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    roleRelevance: ["job-seeker", "student"],
    sections: [
      {
        id: "understand-the-role",
        title: "Understand the role",
        paragraphs: [
          "Start by understanding the role and preparing two or three relevant examples. Read the job description for repeated responsibilities, then connect each responsibility to an experience, project, or decision you can explain clearly.",
        ],
      },
      {
        id: "prepare-your-introduction",
        title: "Prepare your introduction",
        paragraphs: [
          "Prepare a short introduction that gives the interviewer a useful picture of you. Mention the kind of work you have done, the strengths you bring, and why this particular role is a sensible next step.",
        ],
      },
      {
        id: "structure-your-examples",
        title: "Structure your examples",
        paragraphs: [
          "Use a simple structure to explain the situation, your action, and the result. Give enough context for the listener to understand the challenge, then spend most of the answer on the choices you made and what changed because of them.",
        ],
      },
      {
        id: "practise-without-a-script",
        title: "Practise without a script",
        paragraphs: [
          "Practise without memorising a script. A few bullet points for each story will help you stay natural while still covering the important details, including what you learned when the outcome was not perfect.",
        ],
      },
      {
        id: "thoughtful-questions",
        title: "Prepare thoughtful questions",
        paragraphs: [
          "Prepare thoughtful questions for the final part of the conversation. Ask about the team’s priorities, how success is measured, or what the person in this role should accomplish during the first few months.",
        ],
      },
      {
        id: "follow-up",
        title: "Follow up with purpose",
        paragraphs: [
          "Send a short follow-up message that reinforces your interest. Refer to one specific part of the conversation, thank the interviewer for their time, and connect the discussion back to the value you would like to contribute.",
        ],
      },
    ],
  },
  {
    id: "portfolio-foundations",
    title: "Portfolio foundations for independent work",
    description:
      "Turn your best work into a clear story clients and employers can understand.",
    category: "Skills",
    subject: "Portfolio",
    tags: ["Freelancing", "Portfolio"],
    type: "Article",
    language: "English",
    difficulty: "Intermediate",
    author: "Ava Patel",
    readingTime: 10,
    publishedAt: "2026-11-05",
    updatedAt: "2026-11-05",
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
    roleRelevance: ["freelancer", "job-seeker"],
    sections: [
      {
        id: "story-behind-the-work",
        title: "Tell the story behind the work",
        paragraphs: [
          "A portfolio is a guided tour of your decisions, not only a gallery of finished work. The strongest projects help a reader understand what you noticed, what you changed, and why the final result matters.",
        ],
      },
      {
        id: "right-projects",
        title: "Choose the right projects",
        paragraphs: [
          "Choose projects that support the kind of work you want next. A small collection with a clear point of view is usually more persuasive than a large archive with no explanation or connection between the pieces.",
        ],
      },
      {
        id: "your-contribution",
        title: "Explain your contribution",
        paragraphs: [
          "For every project, explain the problem, your contribution, and the outcome. Make your role explicit when the work involved a team, and separate what you owned from what you supported.",
        ],
      },
      {
        id: "show-your-decisions",
        title: "Show your decisions",
        paragraphs: [
          "Show the decisions behind the final result. Include an early direction, a constraint you had to work within, or a moment when feedback changed the approach so the reader can see how you think.",
        ],
      },
      {
        id: "focus-on-the-work",
        title: "Focus on the work you want",
        paragraphs: [
          "Keep the first screen focused on the work you want to do more often. Use a clear title and one sentence of context before asking someone to open the full case study.",
        ],
      },
      {
        id: "visitor-experience",
        title: "Review the visitor experience",
        paragraphs: [
          "Review the portfolio like a first-time visitor. Check that the navigation is easy to understand, the images load quickly, the writing is concise, and every project makes the next conversation easier to start.",
        ],
      },
    ],
  },
  {
    id: "teaching-with-feedback",
    title: "Teaching with useful feedback",
    description:
      "Practical ways to make feedback specific, kind, and easy to act on.",
    category: "Skills",
    subject: "Teaching",
    tags: ["Tutoring", "Feedback"],
    type: "Notes",
    language: "English",
    difficulty: "Beginner",
    author: "Maya Chen",
    pageCount: 6,
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    roleRelevance: ["tutor", "student"],
    sections: [
      {
        id: "observed-work",
        title: "Describe what you observed",
        paragraphs: [
          "Useful feedback starts with what you observed, not what you assume. Describe the work, words, or decision you noticed before suggesting the next step, and use specific examples the learner can recognise.",
        ],
      },
      {
        id: "why-it-matters",
        title: "Explain why it matters",
        paragraphs: [
          "Explain why the observation matters. Connecting the detail to the learning goal helps the learner understand the effect of the choice instead of treating feedback as a personal preference.",
        ],
      },
      {
        id: "one-opportunity",
        title: "Focus on one opportunity",
        paragraphs: [
          "Keep one feedback conversation focused on one improvement opportunity. A short, focused conversation gives the learner a realistic action to try and leaves room to notice progress later.",
        ],
      },
      {
        id: "practical-next-step",
        title: "Offer a practical next step",
        paragraphs: [
          "Offer a next step that can be practised. Demonstrate a possible approach, share a question to ask, or invite the learner to revise one small part of the work while the context is still fresh.",
        ],
      },
      {
        id: "learner-perspective",
        title: "Make room for the learner",
        paragraphs: [
          "Make room for the learner’s perspective. Ask what felt difficult, what they were trying to achieve, and which suggestion feels most useful so the conversation becomes collaborative rather than one-directional.",
        ],
      },
      {
        id: "next-check-in",
        title: "Invite the next step",
        paragraphs: [
          "End by asking the learner to explain what they will try next. Their response shows whether the feedback was clear and gives you a natural starting point for the next check-in.",
        ],
      },
    ],
  },
  {
    id: "product-photography",
    title: "Product photography with everyday light",
    description:
      "Create clearer product images with a simple setup and consistent framing.",
    category: "Business",
    subject: "Marketing",
    tags: ["Selling", "Photography"],
    type: "Article",
    language: "English",
    difficulty: "Beginner",
    author: "HelloEra Commerce Team",
    readingTime: 7,
    publishedAt: "2026-11-03",
    updatedAt: "2026-11-03",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    roleRelevance: ["seller", "freelancer"],
    sections: [
      {
        id: "natural-light",
        title: "Start with natural light",
        paragraphs: [
          "Use a window as your first light source and turn off mixed indoor lighting. Soft light from the side usually reveals shape without creating harsh reflections, while a white wall or card can bounce light back into darker areas.",
        ],
      },
      {
        id: "simple-setup",
        title: "Keep the setup simple",
        paragraphs: [
          "Create a simple setup before adding equipment. A clean surface, a neutral background, and a stable stand can produce a more consistent result than a complicated arrangement that is difficult to repeat.",
        ],
      },
      {
        id: "flexible-framing",
        title: "Create flexible framing",
        paragraphs: [
          "Leave enough space around the product so the image can be reused in different layouts. Extra breathing room makes it easier to crop the photo for a marketplace card, a social post, or a banner without cutting off important details.",
        ],
      },
      {
        id: "consistent-framing",
        title: "Keep framing consistent",
        paragraphs: [
          "Keep the camera position and framing consistent across a set. Mark the position of the product and the camera so new images share the same scale and perspective.",
        ],
      },
      {
        id: "product-in-context",
        title: "Show the product in context",
        paragraphs: [
          "Take a detail shot and one image that shows the product in context. The detail image answers questions about texture and finish, while the context image helps someone imagine how the product fits into everyday use.",
        ],
      },
      {
        id: "publishing-review",
        title: "Review before publishing",
        paragraphs: [
          "Finish with a simple review before publishing. Check focus, distracting reflections, colour consistency, and whether the image shows the product honestly from the angle a customer is most likely to care about.",
        ],
      },
    ],
  },
  {
    id: "career-notes",
    title: "Notes for building a career habit",
    description:
      "Small routines that make learning and career progress easier to sustain.",
    category: "General Learning",
    subject: "Career",
    tags: ["Habits", "Growth"],
    type: "PDF",
    language: "English",
    difficulty: "Beginner",
    author: "HelloEra Learning Team",
    pageCount: 14,
    publishedAt: "2026-11-02",
    updatedAt: "2026-11-02",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    roleRelevance: ["student", "job-seeker", "freelancer"],
    sections: [
      {
        id: "repeatable-progress",
        title: "Make progress repeatable",
        paragraphs: [
          "Career progress is easier to sustain when it becomes a small, repeatable habit instead of a large task reserved for a perfect day. Choose a routine that fits your existing week and make the first version intentionally easy.",
        ],
      },
      {
        id: "weekly-direction",
        title: "Choose a weekly direction",
        paragraphs: [
          "Start with a weekly direction. Write down one skill, relationship, or opportunity that deserves attention, then choose one action that would create visible progress before the week ends.",
        ],
      },
      {
        id: "learning-block",
        title: "Protect a learning block",
        paragraphs: [
          "Protect a short learning block. Twenty focused minutes can be enough to read a chapter, practise a tool, review a project, or write down a question for someone with more experience.",
        ],
      },
      {
        id: "evidence-of-progress",
        title: "Keep evidence of progress",
        paragraphs: [
          "Keep evidence of what you are building. Save useful notes, examples of your work, feedback, and small wins in one place so your progress is visible when motivation is low.",
        ],
      },
      {
        id: "professional-relationships",
        title: "Build professional relationships",
        paragraphs: [
          "Use conversations as part of the habit. A thoughtful message, a question in a community, or a short follow-up after meeting someone can turn isolated learning into a professional relationship.",
        ],
      },
      {
        id: "monthly-review",
        title: "Review and adjust",
        paragraphs: [
          "Review the habit at the end of each month. Keep the smallest actions that created momentum, adjust the ones that no longer fit, and choose the next experiment instead of waiting for a complete plan.",
        ],
      },
    ],
  },
]

export const mockResources: Resource[] = mockResourceInputs.map((resource) => ({
  ...resource,
  sections: resource.sections.map((section, index) => ({
    id: section.id,
    resourceId: resource.id,
    order: index + 1,
    title: section.title,
    blocks: section.paragraphs.map((text, paragraphIndex) => ({
      id: `${section.id}-paragraph-${paragraphIndex + 1}`,
      type: "paragraph" as const,
      text,
    })),
  })),
}))
