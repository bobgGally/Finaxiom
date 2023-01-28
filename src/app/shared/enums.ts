export enum TaskActionTransition {
    Approve = "Approve",
    Reject = "Reject",
    Acknowledge = "Acknowledge",
    Submit = "Submit",
    Save = "Save",
}



export enum ApprovalStage {
    PreApproval_New = "NEW",
    PreApproval_CFN_NotAvailable = "CFN NOT AVAILABLE",
    PreApproval_QRA_Review = "QRA REVIEW",
    PreApproval_CFN_Discrepancy = "CFN DISCREPANCY",
    PreApproval_LaunchDate_Review = "LAUNCH DATE REVIEW",
    PreApproval_PRC_SC_Review = "PRC-SC REVIEW",
    PreApproval_Finance_Review = "FINANCE REVIEW",
    PreApproval_Finance_Rejected = "FINANCE REJECTED",
    PreApproval_Launch_Approved = "LAUNCH APPROVED",
    PreLaunch_License_Approved = "LICENSE APPROVED",
}

export enum AppStatus {
    Draft = 0,
    Active = 1,
    Waiting = 2,
    Suspended = 3,
    Deleted = 4,
    Archived = 5,
    Open = 6,
    Completed = 7,
    Rejected = 8,
    InactiveForRevision = 9,
    Withdrawn = 10,
    Pipeline = 11,
    Cancelled = 12,
    Paused = 13
}



export enum RASubmissionStatusEnum {
    Planning = 0,
    Submitted = 1,
    Government_Query = 2,
    Approved = 3,
    Withdrawn = 4,
    Cancelled = 5,
    Rejected = 6
}

export enum RequestType {
    Pre_Approval,
    Pre_Launch,
    Post_Launch,
    Withdrawal,
    SubmissionDateChange,
    DateChangeEmail
}

export enum RaSubmissionType {
    Device,
    Country,
    Global
}



export enum QueryTaskStatusEnum {
    Active = 0,
    Completed = 1,
    All = 2
}

export enum SubscriberType {
    ProjectOwner,
    Subscriber
}
export enum ReportTypeEnum {
    ProjectSummaryEmail = 1,
}

export enum ReportSubReferenceType {
    BusinessUnit,
    Frequency,
    Country,
    FY,
    Stage,
    SBU
}

export enum ReportSubFrequency {
    Adhoc,
    Weekly,
    Monthly,
}
export enum ReportSubFY {
    PastTwoYears = -2,
    PastOneYear,
    CurrentYear,
    FutureOneYear,
    FutureTwoYears
}

export enum DelegatesModuleNames {
    BAINT = 'BAINT',
    MEMRP = 'MEMRP',
    NPIGENIE = 'NPIGENIE'
}

export enum DelegateStatus {
    InActive,
    Active,
    Archived,
    AwaitingApproval,
    Rejected
}