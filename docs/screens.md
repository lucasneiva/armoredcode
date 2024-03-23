# Screens

All screens are based on our top 6 core feeatures. The following core features are the most important and paramount for the ArmoredCode platform:

1. **Project Management**
   - The ability for clients to create and manage cybersecurity projects related to software development is at the heart of the platform. Features like structured project postings, work item management, and proposal review/acceptance are critical for facilitating the collaboration between clients and freelancers.

2. **Freelancer Profiles**
   - Having comprehensive and verified profiles for freelancers is essential for clients to assess their skills, experience, and suitability for specific projects. Features like security specializations, work samples, certifications, work experience, and verification mechanisms are crucial for establishing trust and enabling effective matching between projects and freelancers.

3. **Search and Filtering**
   - Robust search and filtering capabilities are paramount for both clients and freelancers to find relevant projects and professionals, respectively. Clients need to be able to filter freelancers based on skills, technologies, and security specializations, while freelancers need to filter projects based on their expertise and preferences.

4. **Secure Communication**
   - Given the sensitive nature of cybersecurity projects, secure communication channels are a core requirement. Features like encrypted project-specific messaging, file sharing with security focus, and chat histories ensure that sensitive information is protected during project collaboration.

5. **Proposal Submission and Review**
   - The ability for freelancers to submit proposals for projects and for clients to review and accept those proposals is a critical component of the platform's workflow. Features like cover letters, pricing options (fixed-price or hourly), and proposal status tracking are essential for facilitating this process.

6. **Feedback and Reviews**
   - Providing a mechanism for clients and freelancers to provide feedback and reviews on completed projects is important for building trust, reputation, and continuous improvement within the platform's ecosystem.


## Project Management:
### Project Posting Screen

Designed for clients to initiate new project listings.

#### Key Elements:
- Project Title
- Detailed Description (scope, requirements, deliverables)
- Project Category (dropdown or selection from existing categories)
- Budget (fixed price, hourly rate range, or options for both)
- Desired Skills 
- Expected Timeline
- File attachment option (for supporting documents if needed)

### Project Dashboard

* **Overview for both clients and freelancers:**  A central hub for an active project.  The client and freelancer views would likely be tailored to their specific needs.
* **Key Elements (common to both):**
    * Project Title, Status, Timeline
    * Work Item List (progress indicators: not started, in progress, completed)
    * Chat/Communication Area (link to full chat screen)
* **Additional Client View Elements:**
    * Proposals Received (if applicable)
    * Financial Summary (payments made, remaining balance)
* **Additional Freelancer View Elements:**
    * Task Assignments (items assigned to them)
    * Option to submit work for review

### Work Item Management Screen

* **Primarily for Project Management:**  Breaking down the project into smaller units of work.
* **Key Elements:**
    * Ability to add new work items (with title, description, maybe even estimated effort)
    * Setting status (Not Started, In Progress, Awaiting Review, Completed etc.)

### Proposal Management Screen

* **Two Views: Client and Freelancer**
* **Client View Key Elements:**
    * List of open projects awaiting proposals
    * For each project, view received proposals (freelancer profile summaries, proposed rate/price, cover letter, etc.)
    * Ability to compare proposals side-by-side
    * Actions to accept, decline, or request revisions to proposals

* **Freelancer View Key Elements**
    * List of open projects relevant to their skills 
    * Ability to view project details
    * Form to submit a proposal (rate/price, estimated timeline, cover letter)
    * View status of submitted proposals 


## Freelancer Profiles and Verification:

### Profile Creation/Editing Screen

* **Core of Freelancer Presence:** Where a freelancer crafts their professional profile.
* **Key Elements:**
    * Basic Contact Information
    * Profile Summary (short bio highlighting their skills)
    * Service Offerings (detailed description of services)
    * Skill Selection (dropdown or tagging from a predefined list)
    * Experience Level (dropdown: beginner, intermediate, etc.)
    * Availability Status (dropdown)
    * Hourly Rate & Currency
    * Resume Upload
    * Profile Photo

### Skill Management (User-Facing)

This would likely be integrated into both the Freelancer and Client workflows:

* **Freelancer Profile:** During profile setup and later edits, freelancers select skills from the master list maintained by admins. Autocomplete/suggested skills would make this process more efficient.
* **Search and Matching:** The 'master skill list' feeds into project search filters and the recommendation engine. Clients should be able to search projects and freelancers using the same standardized vocabulary of skills curated on the admin screen.

### Verification Dashboard

* **Managing Trust:** A screen for freelancers to track their verification status and potentially for administrative use as well.
* **Key Elements (Freelancer View):**
    * List of Verification Types (ID, Address, Phone, Payment, etc.)
    * Status of Each Verification Type (Pending, Submitted, Approved, Rejected)
    * Ability to Initiate New Verifications (uploading documents, providing details)
    * Notes or Instructions Regarding Verifications

### Work Sample Portfolio Screen

* **Showcasing Past Success:** Allowing freelancers to display previous work.
* **Key Elements:**
    * Ability to add new work samples (Title, Description, Link/Sample Upload)
    * Categorization of Samples (if applicable)
    * Option to visually feature specific samples on their main profile


### Certification Management Screen

* **Displaying Credentials:** Formal recognition of skills.
* **Key Elements:**
    * Ability to Add New Certifications (Name, Provider, Date Obtained)
    * Option to Include Expiry Date (if applicable)
    * Ability to Link/Upload Scanned Certificates 

### Work Experience Timeline Screen

* **Illustrating Career History:**  A more narrative display of work experience.
* **Key Elements:**
    * Ability to Add New Experience Entries (Company, Job Title, Start date, End Date, Detailed Description)
    * Option to order chronologically or highlight specific experiences

### Additional Considerations

* **Public vs. Editable:**  It's important to distinguish which parts of these screens would be part of the freelancer's public profile versus private editing areas.

## Search and Matching:

### Project Search Screen

* **Client-Focused:**  Helping clients find relevant projects quickly.
* **Key Elements:**
    * Free-text Keyword Search Bar
    * Category Filter (Dropdown or selection list)
    * Skill Filters (may leverage data from the Skills entity)
    * Budget Range Filter
    * Availability Filters (e.g., only show projects starting within a certain timeframe)
    * Sorting Options (by recency, price, freelancer success rate, etc.)

### Freelancer Search Screen

* **Client-Focused:**  Helping clients find the right freelancers for their project.
* **Key Elements**
    * Similar Filters to Project Search (Skill, Category, Availability)
    * Hourly Rate Range Filter
    * Location Filter (if relevant)
    * Language Filters
    * Experience Level Filter
    * Option to filter by Verification Status (e.g., only show verified freelancers)
    * Success Rate or Review Score Filter

### Matching Results Screen

* **Displays Search Results:** Presents both project and freelancer search results in a clear format.
* **Key Elements:**
    * Result Listings (with key summary information, designed differently for projects vs. freelancers)
    * Pagination or 'Load More' option if many results
    * Continued Refinement: The filters from the search screens would stay accessible for further refining.

### Saved Searches Screen

* **Convenience Feature:** Allowing users to save and re-run frequent searches.
* **Key Elements:**
    * List of Saved Searches (with names/descriptions given by the user)
    * Options to Run, Edit, or Delete Saved Searches
    * Potential for Automated Notifications: The platform could alert users of new projects/freelancers matching their saved searches

### Recommended Matches Screen

* **Proactive Suggestions:** This depends on whether your platform has a recommendation engine.
* **Key Elements (if applicable):**
    * Projects Recommended to a Freelancer (based on their profile)
    * Freelancers Recommended to a Client (based on project details) 
    * Brief Explanation of Why Each Match is Suggested (e.g., "This project matches your top 3 skills")

### Points for Further Exploration

* **Visualizing Search Results:** Would you primarily use list views, or have card-like layouts with more information visible at a glance?
* **Search vs. Browse:**  Will the platform offer ways to browse freelancers based on categories or highlighted profiles, in addition to a search bar?
* **Balancing Recommendation Simplicity and Power:** How complex the recommendation system will be – simple skill matching or a more advanced algorithm factoring in past success rates, etc.

## Secure Communication and Collaboration:

### Project Communication Hub

* **Centralized Workspace:** This likely sits within the Project Dashboard, providing a focused area for project-related communication.
* **Key Elements:**
    * Real-time Chat (similar to your Chat entity)
    * Direct Messaging (if the platform allows one-on-one conversations outside broader project chat)
    * In-Context File Sharing (ability to attach files directly to chat messages or discussions)

### File Sharing Screen

* **File Management:** Could be integrated within the Communication Hub or a standalone screen for a more centralized view.
* **Key Elements:**
    * File Upload (with document, image, etc., type support)
    * Folder Organization (potential to create subfolders within a project)
    * Shared File List (all files associated with the project)
    * File Versioning (if the platform supports tracking revisions)
    * Download Permissions (potentially controlled by who uploads the file)

### Chat History Screen

* **Record Keeping:** An archive for project communication.
* **Key Elements:**  
    * Searchable Chat History (by keyword, date, user) 
    * Ability to Filter (view entire history of a project, specific thread, etc)
    * Export Options (for users to save communication externally if necessary)

### Additional Considerations

* **Notifications:**  How the platform alerts users about new messages, file uploads, etc. would strongly tie into these screens. 
* **Security:**  Consider highlighting any security measures in place (file encryption, message history retention policies, etc.), especially if that's a selling point for your platform
* **Accessibility:** Think about features for users with disabilities (e.g., text transcripts for video calls, alternative text descriptions for images).

## Feedback:

### Project Review Screen

* **Post-Project Evaluation:** Dedicated screen for capturing client and freelancer feedback upon project completion.
* **Key Elements:**
    * Star Rating (for overall project satisfaction)
    * Text Comment Fields (for both client and freelancer)
    * Potential for Skill-Specific Ratings (if the client wants to rate the freelancer on communication, technical expertise, etc.)
    * Option to Mark Review as Private (visible to platform admins only, perhaps for dispute cases)

### Reputation Dashboard

* **Focus on the Freelancer:**  A freelancer-facing screen to track their feedback and reputation.
* **Key Elements:**
    * Aggregate Success Rate / Rating (calculated from project review data)
    * Recent Project Reviews (with option to view full history)
    * Option to Dispute Reviews (if the platform has a process for this)
    * Could potentially showcase positive reviews prominently 

### Freelancer Rating/Ranking Screen

* **Client-Focused:** Assists clients in evaluating freelancers when searching or browsing.
* **Key Elements:**
    * Sortable List of Freelancers (likely integrated into the search results screen)
    * Key Metrics Visible: Overall success rate, number of projects completed, possibly hourly rate
    * Ability to Filter by specific skills alongside viewing ratings
    * Clear indication of Verification Status
    * Links to individual freelancer profiles 

### Client Rating Screen

* **The Other Side:**  Though likely less complex than the freelancer side, allowing freelancers to evaluate clients might be valuable.
* **Key Elements**
    * Similar concept to the Project Review screen, but focused on client responsiveness, clarity of requirements, etc.
    * Might influence a freelancer's decision to bid on a client's projects

### Important Considerations

* **Transparency:**  How much detail of the feedback system will be made public? Will individual reviews be on freelancer profiles, or just aggregate scores?
* **Potential for "Badge" System:**  Top-rated freelancers could earn badges that are displayed prominently to establish credibility.
* **Gamification:**  The platform could incorporate elements that encourage giving positive feedback,  contributing to a more collaborative environment.

## Administrative Functionalities:
### Project Category Management Screen (Admin)

* **Platform Organization:**  Allows admins to manage the categories used to classify projects.
* **Key Elements:**
    * List of Existing Categories 
    * Ability to Add New Categories
    * Edit Category Names and Descriptions
    * Potential to Nest Categories (creating sub-categories)
    * Option to Deactivate Categories (rather than deleting them, if associated with past projects)

### Technology Management Screen (Admin)

* **Tracking in-demand skills:**  Similar in structure to the category screen, but focused on technologies.
* **Key Elements:**
    * List of Existing Technologies 
    * Ability to Add New Technologies
    * Edit Technology Names (important as tech terminology can evolve quickly) 
    * Potential for Grouping Technologies (e.g., Front-end, Back-end, Database)

### Verify Freelancer

* **Vetting and Trust:**  An admin screen with details to review freelancer verification requests.
* **Key Elements**
    * List of Pending Verification Requests (filtered by verification type)
    * Display of Submitted Documentation (uploaded IDs, proof of address, etc.)
    * Ability to Approve or Reject a Verification 
    * Option to Add Notes (for communication with the freelancer or for internal administrative records)

### Accept Freelancer Registration

* **User Onboarding Control:**  This depends on whether your platform has manual approval for new freelancer registrations.
* **Key Elements:**
    * Queue of Pending Registrations
    * View Freelancer Profile Summary (as they would present it publicly)
    * Approve/Reject Registration
    * Option to Request Additional Information (if needed before approval)

### Skill Management Screen (Admin)

Centralized Control: Where admins curate the master list of skills used across the platform.
Key Elements:
-    List of Existing Skills (with search functionality)
-   Ability to Add New Skills
-  Edit Skill Names (to address changes in terminology, or to fix typos)
- Merging Similar Skills (to prevent redundancy and improve search relevance)
- Deactivate Skills (useful if certain skills become obsolete)
- Potentially: Add Short Skill Descriptions (offering more context on the scope of - the skill)

### Important Considerations:

* **Scalability:** If the platform grows, you might need bulk actions (approve multiple verifications at once) or more granular filters.
* **Reporting:** For the platform's health, admins likely need reports on things like new registrations per week, verifications completed, etc.
* **Policy Transparency:** Will there be clear documentation for users outlining the requirements and processes for verification and registration approval?

## Notification and Messaging:
   - Notification Inbox Screen
   - In-App Notification Center

## Payment and Billing:

### Payment Method Management Screen

* **Secure Financial Settings:** User-focused (both clients and freelancers) 
* **Key Elements:**
    * Adding Payment Methods:
        * Credit/Debit Card entry (likely handled via a secure integration with a payment gateway)
        * Bank Account Linking (for direct transfers)
        * Potentially PayPal or other alternative payment provider integrations
    * List of Saved Payment Methods 
    * Ability to Set Default Payment Method
    * Deleting Saved Payment Methods
* **Security Considerations**
    * The platform likely would not store full payment details directly. Instead, data would be tokenized by the payment gateway.
    * Emphasis on the platform's security compliance (PCI-DSS, etc.)

### Subscription Management Screen (For Premium Features)

* **Monetization Model:** This assumes your platform has tiered access with premium features.
* **Key Elements**
    * Clear Display of Available Subscription Plans (Free vs. Paid tiers, highlighting benefits)
    * Current Subscription Status (active plan, renewal date)
    * Upgrading or Downgrading Subscriptions
    * Option to Cancel Subscription
    * Payment History (tied to the payment method screen)

**Additional Considerations**

* **Invoicing:** Depending on your project model, there might be a screen for viewing and generating invoices.
* **Escrow:** If the platform acts as an escrow service (holding funds during the project), there would be screens related to tracking balances and initiating payouts.
* **Pricing Transparency:**  A public-facing page detailing subscription/pricing plans should exist, even if the management of them is behind a login.

## Onboarding and Support:
   - Platform Tour/Walkthrough Screen
   - Help and Support Center
   - FAQ Screen
   - Contact Us Screen


