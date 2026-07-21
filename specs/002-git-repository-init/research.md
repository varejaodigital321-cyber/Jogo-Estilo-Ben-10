# Research: Local Git Repository Initialization

## Decision: Initialize the empty metadata directory in place

**Rationale:** `git init -b main` is Git's native repair path for an empty
`.git` directory. It creates only repository metadata and leaves working files
unmodified.

**Alternatives considered:** Deleting `.git` first is unnecessary. Creating a
commit or remote is intentionally deferred because the owner did not authorize
those external-history decisions.

## Decision: Verify an unborn branch rather than create a commit

**Rationale:** A valid repository can have an unborn branch. This proves the
repair without assigning authorship or snapshotting the current workspace.

**Alternatives considered:** An initial commit would add history and require a
configured identity; it is outside the accepted scope.
