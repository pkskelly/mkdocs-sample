# Work Item States

These diagrams are enabled in mkdocs using [the Mermaid Plugin](https://github.com/fralau/mkdocs-mermaid2-plugin)

Work Items are managed by state in order to ensure [priority is set](./work-item-prioritization.md), requirements are gathered, and progress is tracked across product release stages.  While some differences in the definitions of Epic and Feature for Hybrid and Emergent work, the states are applied the same across work item types.

## Epic States

| **State**     | **Definition**                     | **Transitions**                            | **Notes**                                           |
| :------------ | :------------------------------------- | :----------------------------------------- |:--------------------------------------------------- |
| Not Started| Remains Not Started until work has begun at the Team level for any child item(s)  | Product Management changes state to InProgress, Closed or On Hold|  |
| In Progress | When the team is actively working on any child item(s) of an Epic it is "In Progress" | Product Management changes state to Closed or On Hold | |
| Closed | When all child work items are complete and there are no plans to add new items. | Product Management will not change state from Closed |  |
| On Hold| If (for any reason) work is stopped, status is changed to On Hold while work is not being done. | Product Management changes state to Closed or In Progress | |

## Epic State Transitions

``` mermaid
stateDiagram-v2
    [*] --> NotStarted
    NotStarted --> InProgress
    InProgress --> Closed
    InProgress --> OnHold
    OnHold --> InProgress
    OnHold --> Closed
    Closed --> [*]

```

## Feature States

| **State**     | **Definition**                     | **Transitions**                            | **Notes**                                           |
| :------------ | :------------------------------------- | :----------------------------------------- |:--------------------------------------------------- |
| Proposed  | Work has been determined, still may require refinements to overall features | Prod Mgmt changes from proposed to Approved, could move to InProgress  | This is independent of Paid feature, T4 funded, or other types of Feature.  Approved typically represents a customer funded project feature. |
| Approved | Feature was approved by customer (if paid) or T4 and ready for user stories. | Prod Mgmt can change to In Progress or On Hold | Indicates that user stories can be created for this feature.  **Why would a T4 Feature ever be in this state?**|
| In Progress | At least one User Story have been completed (requirements) and Feature (or children) is actively being developed |  ProdMgmt can change to OnHold, Closed, Cancelled | |
| On Hold | If (for any reason) work is stopped, status is changed to On Hold while work is not being done. | ProdMgmt can change to Approved, InProgress, Cancelled | e.g. this might be due to customer's blocking, not providing data, etc. |
| Beta | ??? | ??? | This is no longer needed for Features, Features would be left InProgress by ProdMgmt|
| UAT  | ??? | ??? | This is no longer needed for Features, Features would be left InProgress by ProdMgmt|
| Closed  | All requirements are met, all child work items meet "Definition of Done" and the feature is released to Production | | |
| Cancelled | Determined work was not needed, or could be cancelled by customer (if paid) | Should not change state after this| Code may have been written, but is not releasable |

**Questions:**

- Should Development Team be changing any of the Feature level states? Does this impact DevOPs and deployments? Should state changes be made by DevOps.
- 
- When are Features prioritized and planned in the Roadmap and how is this indicated in a status?

## Feature State Transitions

``` mermaid
stateDiagram-v2
    [*]--> Proposed
    Proposed-->Approved : Customer Funded
        note right of Approved
            Customer Paid features should 
            be scoped to a single Feature
        end note
    Proposed-->InProgress
    Approved-->InProgress
    Approved-->OnHold
    InProgress-->OnHold
    InProgress-->Cancelled
    InProgress-->Closed
    OnHold-->Approved : Wouldn't Blocked be better?
    OnHold-->InProgress
    OnHold-->Cancelled
    Closed --> [*]
    Cancelled --> [*]

```


## User Story

| **State**     | **Definition**                     | **Transitions**                            | **Notes**                                           |
| :------------ | :------------------------------------- | :----------------------------------------- |:--------------------------------------------------- |
| To Do | Work has not begun | Prod Dev changes to BizReqs, TechSpecs,  | |
| Ready for Refinement | | | |
| Business Requirements | | | |
| Technical Specifications | | | If this was done in Tasks, then there may be no need for this. |
| In Development | | | |
| Blocked | | | |
| In Code Review | | | |
| QA | | | |
| Alpha | | | |
| Beta | | | |
| UAT | | | |
| Ready for QA | | | Why have this and QA? Elena mentioned she works in QA and Priya works in Ready for QA. Why is there a status for a single person?|
| Pending QA Deployment | | | |
| Pending Merge | | | |
| Closed | | | |

If you have multiple items within the same priority tier, refer to the Severity or Priority on the work item. As usual, if you are still uncertain, you should ask the Product Manager, Scrum Master, or Technical Program Manager.

Do we need a state that indicates "Business Requirements Under Dev" or does "Business Development" cover this?



# User Story State Transitions 

``` mermaid
stateDiagram-v2
    [*]-->ProdMgmt
    state :  ProdMgmt {
        ToDo-->ReadyForRefinement
        ReadyForRefinement-->BizReqs 
        BizReqs-->TechSpecs : Requirements and Story Pointing
            note right of BizReqs
                During the Refinement
                Meeting
            end note
    }
    state :  ProdDev {
        TechSpecs-->InDevelopment
        InDevelopment-->InCodeReview
        InCodeReview-->PendingMerge
        PendingMerge-->ReadyForQA
        ReadyForQA-->QA
        QA-->InDevelopment : Defect created
        QA-->Closed
    }
    Closed-->[*]

   
``` 