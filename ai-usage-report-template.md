# AI Usage Report

**Complete this report even if you did not use any AI tools. We encourage AI-assisted development. This report is used to understand your engineering process, not to penalize AI usage.**

---

# Candidate Information

**Name:**

**Date:**

**Assignment Version:**

---

# 1. AI Tools Used

* Did you use AI during this assignment?

  * ☐ Yes
  * ☐ No

If yes, list all tools used.

| Tool           | Version / Model | Purpose |
| -------------- | --------------- | ------- |
| Cursor         |                 |         |
| GitHub Copilot |                 |         |
| ChatGPT        |                 |         |
| Claude         |                 |         |
| Gemini         |                 |         |
| Other          |                 |         |

---

# 2. AI Usage Timeline

For each significant interaction, record your workflow. Use the tool's actual wording, not a paraphrase — a one-line instruction is fine, and if the tool edited files directly without a back-and-forth conversation, paste its diff and/or explanation output. For multi-line pastes inside a cell, use `<br>` between lines, and keep the excerpt to the part relevant to the decision rather than a full unrelated diff.

| Problem | Prompt Given (verbatim) | Tool's Response (verbatim) | Accepted?             | How You Verified / What You Changed |
| ------- | ------------------------ | --------------------------- | --------------------- | ------------------------------------ |
|         |                           |                              | Yes / Partially / No |                                       |

---

## 3. Validation & Verification

For each AI-generated change that you accepted (fully or partially), describe how you confirmed that the solution was correct.

| Issue / Feature                              | How did you verify the AI suggestion?                                                                                                                               | Evidence that the fix worked                                                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Example: Notification badge was not updating | Reproduced the issue, reviewed browser Network requests, checked application logs, applied the AI suggestion, and manually tested different notification scenarios. | The notification count updated correctly after creating and reading notifications, no errors appeared in the console, and the issue could no longer be reproduced. |
|                                              |                                                                                                                                                                     |                                                                                                                                                                    |
|                                              |                                                                                                                                                                     |                                                                                                                                                                    |

Examples of verification methods include:

* Reproduced the issue before applying the fix.
* Compared application behavior before and after the change.
* Reviewed browser Network requests or Console logs.
* Inspected backend or application logs.
* Ran unit or integration tests.
* Added a temporary test case.
* Compared the implementation with official documentation.
* Validated database records where applicable.
* Asked the AI to explain its reasoning before applying the change.
* Performed manual testing for common and edge-case scenarios.

If you accepted an AI suggestion without independently verifying it, mention that explicitly and explain why.


---

# 4. Incorrect or Misleading AI Suggestions

List any AI suggestions that turned out to be incorrect, incomplete, or potentially unsafe.

| Issue | AI Suggested | Why it was Incorrect | Final Solution |
| ----- | ------------ | -------------------- | -------------- |
|       |              |                      |                |

If none, write "None".

---

## 5. Significant Engineering Decisions

Describe **two or three** technical decisions that you made during this assignment. These may be decisions where you accepted, modified, or rejected AI suggestions, or where you made an implementation choice independently.

For each decision, explain:

* The problem or requirement.
* The options you considered (including any AI suggestion, if applicable).
* The approach you chose.
* Why you believed it was the best solution.

| Decision                                     | Options Considered                                                                   | Final Choice                    | Reasoning                                                                          |
| -------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------- |
| Example: Organizing shared utility functions | Keep duplicate helper functions in multiple files, or create a shared utility module | Created a shared utility module | Reduced code duplication, improved maintainability, and made future changes easier |
|                                              |                                                                                      |                                 |                                                                                    |
|                                              |                                                                                      |                                 |                                                                                    |

This section is intended to help us understand your engineering thought process. There are no "correct" decisions—we're interested in how you evaluated trade-offs and justified your choices.


---

# 6. Security & Privacy

Did you provide any of the following to an AI tool?

* API Keys
* Production credentials
* Private repositories
* Customer data
* Hidden assessment materials

☐ No

☐ Yes (Explain)

---

# 7. Estimated AI Contribution

Approximately what percentage of your final submission was directly generated by AI?

* ☐ 0%
* ☐ 1–25%
* ☐ 26–50%
* ☐ 51–75%
* ☐ 76–100%

Briefly explain your estimate.

---

# 8. Reflection

In a few paragraphs, describe:

* Where AI saved you the most time.
* Where AI was not helpful.
* A debugging step you performed without AI.
* If you repeated this assignment, how would you use AI differently?

---

# Candidate Declaration

I confirm that:

* This report accurately describes my AI usage.
* I understand every code change included in my submission.
* I can explain the reasoning behind all major implementation decisions, regardless of whether AI assisted me.

**Signature (Type Full Name):**

**Date:**
