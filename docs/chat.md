# Chat Features

## Core Chat Features

* **Real-Time or Near Real-Time:**  Responsiveness matters for building rapport in early conversations.

* **Timestamping:**  Essential for clarity on when communication occurred.

* **Transport Encryption:**  Messages should be encrypted in transit (HTTPS and WebSockets with TLS for enhanced security).

* **File Sharing:**  Allowing PDFs, code snippets (.txt initially), and images simplifies the discussion of vulnerabilities.  
* **"Proposal" Feature:**  A structured way for a freelancer to outline their suggested fix, estimated timeline, and rate directly within a chat thread.

## Non-Essential Features

* **Message Threading:**  The ability to reply directly to a previous message keeps things organized, especially if multiple team members join from the client-side.

* **Abuse Prevention:**  A basic 'report this message' function for moderation if things go off the rails.

* **Message Retention:** All project-related messages will automatically delete X days after a project is marked as complete. This policy is stated during the project onboarding process. Additionally, users have the ability to delete individual messages or entire chat threads at any time. Clients can remove all project data with a "delete all project data" option.


## Tech Choices 

* **Framework Library:**  React has plenty of chat component options to avoid building from scratch.
* **Backend:**  NodeJS with a WebSocket library (like Socket.io) is a common pairing.
