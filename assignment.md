# BugForge Engineering Assessment

## Context

BugForge is a project-management application built with Next.js, Express, MongoDB, Docker, and GitHub Actions. It is intended to be deployable as a small production service.

The application simulates a production service. It may contain defects, implementation issues, performance bottlenecks, security concerns, or operational problems that require investigation. Your task is to investigate, fix, verify, and document the issues you find. Treat this as a production incident and improvement exercise: make evidence-based changes, preserve existing behavior, and avoid broad rewrites.

---

## Getting Started

Clone the starter repository:

**Repository:**
https://github.com/Cipher-Schools/FSD-Assignment.git

Work on your own local copy of the repository.

> **Do not create a public/private GitHub repository for your solution.**

You are expected to use Git throughout the assignment. Commit your work incrementally with meaningful commit messages that reflect your investigation and implementation process.

---

## Objectives

Demonstrate sound engineering judgment across:

* Debugging and problem isolation
* Problem solving and trade-off decisions
* Safe and effective AI-assisted development
* Code quality and test design
* Application security
* Performance and data access
* Deployment and operational readiness
* Clear technical documentation

---

## AI Usage

You may use any AI-assisted development tools (for example, Cursor, GitHub Copilot, ChatGPT, Claude, Gemini, etc.). AI usage is encouraged, but we evaluate your ability to verify suggestions, exercise engineering judgment, and explain your decisions. You should understand every change included in your submission.

---

## What to do

1. Run the application and establish a baseline.
2. Identify and fix as many defects as you can within the agreed timebox.
3. Add or improve automated tests where they provide meaningful confidence in your changes.
4. Keep the project buildable and lint-clean.
5. Write a concise engineering report describing your investigation, fixes, verification, and remaining risks.
6. Complete `ai-usage-report-template.md` if you use AI assistance.

---

## Constraints

* Do not replace the application with a different stack or rewrite major subsystems without evidence that it is necessary.
* Do not remove features to hide a defect.
* Do not weaken authentication, authorization, validation, logging, or security controls to make tests pass.
* Do not modify the assessment instructions or reviewer materials.
* Do not search for or rely on hidden solution material.
* Keep commits small and explain the intent of each change.

---

## Submission Instructions

You are **not required** to upload your solution to GitHub.

In fact, **do not create a public GitHub repository containing your solution.**

Submit your work using **one** of the following methods:

### Option 1 (Recommended): Git Bundle

Create a Git bundle from your local repository:

```bash
git bundle create bugforge.bundle --all
```

Submit:

* `bugforge.bundle`
* `candidate-checklist.md`
* `ai-usage-report-template.md`

### Option 2: Project Archive

Compress your project directory into a ZIP file **including the `.git` directory**.

Your archive should contain the complete Git repository, including commit history.

Example:

```
bugforge.zip
└── bugforge/
    ├── .git/
    ├── frontend/
    ├── backend/
    ├── ...
```

Also include:

* `candidate-checklist.md`
* `ai-usage-report-template.md`

---

## Important Submission Requirements

Your submission **must** preserve your complete Git history.

The following submissions **will not be evaluated**:

* Solutions submitted through a **public GitHub repository**.
* Archives that **do not contain the `.git` directory**.
* Git bundles that cannot be cloned successfully.
* Submissions with no meaningful commit history or only a single final commit.

Your commit history is part of the assessment and will be reviewed to understand your engineering process.

---

## Deliverables

Submit:

* Source code with complete Git history
* Source changes and tests
* `candidate-checklist.md`
* Completed `ai-usage-report-template.md` (or an explicit statement that no AI was used)
* Commands and outcomes used to verify the work

Your report should include:

1. A short executive summary
2. Issues found, severity, impact, and root cause
3. Fixes made and alternatives considered
4. Tests and manual verification performed
5. Remaining risks and recommended follow-up work

---

## Success Criteria

We value accurate diagnosis, safe fixes, and clear reasoning more than raw issue count. A candidate who identifies and resolves fewer issues thoroughly, protects user data, and leaves the system easier to maintain will score well.

If you encounter an issue that cannot be fully resolved within the allotted time, document your investigation, explain your reasoning, and describe the approach you would take next.

---

## Academic Integrity

This assessment is intended to evaluate your individual engineering process.

You may:

* Use AI-assisted development tools (such as Cursor, GitHub Copilot, ChatGPT, Claude, Gemini, etc.).
* Read official documentation, framework references, and public learning resources.
* Discuss general programming concepts with others.

You must not:

* Share your solution, commits, or repository with another candidate.
* Copy code or reports from another candidate.
* Submit work that you cannot personally explain and justify.
* Access or distribute hidden assessment materials or reviewer documentation.

Every submission may be reviewed for similarities in implementation, commit history, AI usage patterns, documentation, and engineering decisions. During follow-up discussions, you should be prepared to explain the reasoning behind any part of your submission.

The objective of this assessment is not to complete every task, but to demonstrate your ability to investigate problems, make sound engineering decisions, and verify your work.
