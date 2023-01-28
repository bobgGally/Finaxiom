export class EndPoints {
    public static Lookup = {
        getCountries: '/NPI/NPILookup/GetCountries',
        getMyCountries: '/NPI/NPILookup/GetMyCountries/',
        getMyCountriesSM: '/NPI/NPILookup/GetMyCountriesSM/',
        getBusinessUnits: '/NPI/NPILookup/GetBusinessUnits',
        getMYBusinessUnits: '/NPI/NPILookup/GetMyBusinessUnits/',
        getMYBusinessUnitsSM: '/NPI/NPILookup/GetMyBusinessUnitsSM/',
        getSalesOrgs: '/NPI/NPILookup/GetSalesOrgs',
        getRiskClassification: '/NPI/NPILookup/GetRiskClassifictaion',
        getRegistrationType: '/NPI/NPILookup/GetRegistrationType',
        getRiskClassificationByCountry: '/NPI/NPILookup/GetRiskClassifictaionByCountry/',
        getRegistrationTypeByCountry: '/NPI/NPILookup/GetRegistrationTypeByCountry/',
        getSubBusinessUnits: '/NPI/NPILookup/GetSubBusinessUnitsByBusinessId/',
        getSubBusinessUnitsMultiple: '/NPI/NPILookup/GetAllSubBusinessUnitsByBusinessIds',
        getAllSubBusinessUnits: '/NPI/NPILookup/GetAllSubBusinessUnits',
        getMySubBusinessUnits: '/NPI/NPILookup/GetMySubBusinessUnits/',
        getMySubBusinessUnitsSM: '/NPI/NPILookup/GetMySubBusinessUnitsSM/',
        getAllSubBusinessUnitNames: '/NPI/NPILookup/GetAllSubBusinessUnitNames',
        getGovtQueryResponseDueDate: '/NPI/NPIProcessMisc/GetGovtQueryResponseDueDate?'
    }

    public static NPI = {
        createNewRequest: '/NPI/NPIProcess/CreateNewRequest',
        getRequestByWorkflow: '/NPI/NPIProcess/GetRequestByWorkflow/',
        getRequestbyID: '/NPI/NPIProcess/GetRequest/',
        saveSubmissionData: '/NPI/NPIProcess/SaveNPISubmissionData',
        getSubmissionData: '/NPI/NPIProcess/GetNPISubmissionData/',
        saveAdditionDetails: '/NPI/NPIProcess/SaveNPIAdditionalDetails',
        getAdditionDetails: '/NPI/NPIProcess/GetNPIAdditionalDetails?Npiid=',
        getBasicSubmissionData: '/NPI/NPIProcess/GetSubmissionBasicData/',
        getPostLaunchDetails: '/NPI/NPIProcess/GetPostLaunchDetails/',
        updatePostLaunchDetails: '/NPI/NPIProcess/UpdatePostLaunchDetails',
        getAnyActiveWithdrawRequest: '/NPI/NPIProcess/GetAnyActiveWithdrawRequest/',
        WithdrawRequest: '/NPI/NPIProcess/WithdrawRequest',
        getNPISubmissionDataHistory: '/NPI/NPIProcess/GetNPISubmissionDataHistory/',
        requestToChangeLockedInDates: '/NPI/NPIProcess/RequestToChangeLockedInDates',
        getRASubmissionDataHistoryById: '/NPI/NPIProcess/GetRASubmissionDataHistoryById/',
        getRunningDateChangeRequests: '/NPI/NPIProcess/GetRunningDateChangeRequests?npiid=',
        getform1detail: '/NPI/NPIProcess/Getform1detail/',
        exportForm1: '/NPI/NPIExportForm1/ExportForm1Details',
        saveForm1detail: '/NPI/NPIProcess/SaveForm1detail',
        submitTask: '/NPI/NPIProcess/SubmitTask',
        getMyDraft: '/NPI/NPIProcess/GetMyDraftRequest?userName=',
        deleteRequest: '/NPI/NPIProcess/DeleteRequest/',
        deleteDraftRequest: '/NPI/NPIProcess/DeleteDraftRequest/',
        delegateTask: '/NPI/NPITaskList/ReAssignTask',
        terminateTask: '/NPI/NPIProcess/TerminateRequestByRequestNo/',
        addTaskComments: '/Admin/Workflow/AddTaskComments',
        bulkApproval: '/NPI/NPIProcess/BulkSubmitTask',
        getPendingApprovalTask: '/NPI/NPIProcess/GetWorkflowTaskTracker/',
        getInProgressTasksHistory: '/NPI/NPIProcessMisc/GetInProgressTasksHistory/',
        getCurrentTaskDetails: '/Admin/Workflow/GetCurrentTask/',
        FetchMyTasks: '/NPI/NPIProcess/FetchTasks',  //  for All 
        QueryTasks: '/NPI/NPITaskList/QueryTasks',
        GetTaskAssignedUser: '/Admin/Workflow/GetTaskAssignedActors/', //wfid/tid
        GetTaskAssignedDetailsCurrentNPI: '/NPI/NPITaskList/GetTaskAssignedDetailsCurrent/', //wfid/tid
        GetTaskAssignedDetailsCurrent: '/Admin/Workflow/GetTaskAssignedDetailsCurrent/',
        GetEmailsByUserBehaviors: '/External/UserInterface/GetEmailsByUserBehaviors',
        GetEmailsForRequestID: '/NPI/NPIProcess/GetEmailsForRequestID/',
        GetMyRequests: '/NPI/NPIProcess/GetMyRequests',
        GetAllRequests: '/NPI/NPIProcess/GetAllRequestsFiltered',
        dateChangeEmail: '/NPI/NPIProcess/NotifyDateChangeEmails/',
        getTaskSuperVisors: '/NPI/NPITaskList/GetTaskSuperVisors/',
        changeOwnership: '/NPI/NPIProcess/ReAssignRequestOwnership',
        getWorkflowsByNPIID: '/NPI/NPIProcessMisc/GetDependencyRequestWorkflows?npiId=',
        getSubscriber: '/NPI/NPIReportManager/GetSubscriptions/',
        deleteSubscription: '/NPI/NPIReportManager/DeleteSubscription/',
        addUpdateSubscription: '/NPI/NPIReportManager/AddUpdateSubscriptions',
        pauseResumeRequest: '/NPI/NPIProcess/PauseResumeRequest',
        sendAdhocReport: '/NPI/NPIReportManager/SendAdhocReport',
        getSubscriptionsAll: '/NPI/NPIReportManager/GetSubscriptionsAll/',
        getRequestDetailsByRequestNumber: '/NPI/NPIProcessMisc/GetRequestDetailsByRequestNumber?requestNumber=',
        updateForecastData: '/NPI/NPIProcessMisc/UpdateForecastData'
    }

    public static Delegaion = {
        getAllDelegates: '/Admin/DelegateConfig/GetAllDelegates',
        getDelegate: '/Admin​/DelegateConfig​/GetDelegate​/',
        addDelegate: '/Admin/DelegateConfig/AddDelegate',
        updateDelegate: '/Admin/DelegateConfig/UpdateDelegate',
        deleteDelegate: '/Admin/DelegateConfig/DeleteDelegate/'
    }

    public static Document = {
        validateDocument: '/NPI/NPIProcess/ValidateExcelDoc',
        uploadDocument: '/NPI/NPIProcess/UploadDocument',
        UpdateUpn: '/NPI/NPIProcess/UpdateUpn',
        downloadDocument: '/NPI/NPIProcess/DownloadDocument/',
        ExportBisFile: '/NPI/NPIProcess/ExportBisFile',
        ExportNlrfFile: '/NPI/NPIProcess/ExportNlrfFile/',
        ExportFormVFile: '/NPI/NPIProcess/ExportFormVFile/'
    }

    public static Common = {
        signIn: '/Admin/Auth/SignIn',
        getUserMenu: '/Admin/SiteMap/GetMySiteMap/',
        getEmailsForRequest: '/NPI/NPIProcess/GetEmailsForRequest/'
    }

    public static Users = {
        addUser: '/Admin/User/CreateUser/', //post
        getAllUser: '/Admin/User/GetUsersAll/', //get
        updateUser: '/Admin/User/UpdateUser/', //post
        getUserById: '/Admin/User/GetUser/', //get by user id
        searchUser: '/Admin/User/SearchUser/', //get by user id
        exportUser: '/Admin/User/ExportAllUsers/Med123', //exportuser
        getUsersByBehaviors: '/Admin/User/GetUsersByBehaviors',
        getTaskAssignedDetails: '/Admin/Workflow/GetTaskAssignedDetails/',
        getUserRoles: '/Admin/User/GetUserRoles/',
        userAdvancedSearch:'/NPIExternal/NPIUsers/SearchUsersAdvanced',
        userAdvancedExport:'/NPIExternal/NPIUsers/ExportUsers'
    }

    public static SiteMap = {
        getSiteMapByUser: '/Admin/SiteMap/GetMySiteMap/', //get by {userName}
        getAllSiteMaps: '/Admin/SiteMap/GetSiteMapAll/', //get
        getSiteMapByRole: '/Admin/SiteMap/GetMySiteMapByRole/' //get by {role Id}
    }

    public static Role = {
        getRoleAll: '/Admin/Role/GetRolesAll/', //get
        addRole: '/Admin/Role/CreateRole/', //post
        getRoleById: '/Admin/Role/GetRole/', //get by {id}
        updateRole: '/Admin/Role/updateRole/' //post
    }

    public static Group = {
        getGroupTags: '/Admin/Group/GetGroupTags/', //get
        getGroupAll: '/Admin/Group/GetGroupAll/', //get
        addGroup: '/Admin/Group/CreateGroup/', //post
        updateGroup: '/Admin/Group/UpdateGroup/', //post
        getGroupById: '/Admin/Group/GetGroup/', //get by {id}
    }

    public static Escalation = {
        getEscalation: '/Admin/User/GetEscallationMatrix/', //get
        addUpdateEscalation: '/Admin/User/SaveEscalationMatrix/' //post
    }

    public static Forecast = {
        getHeaders: '/NPI/NPICFNManager/GetNPICFNHeaders', //post
        exportCFN: '/NPI/NPICFNManager/ExportNPICFNToExcel',
        importCFN: '/NPI/NPICFNManager/ImportExcelToNPICFN',
    }

    public static Pricing = {
        exportNPIPricing: '/NPI/NPICFNManager/ExportNPIPricingToExcel',
        importNPIPricing: '/NPI/NPICFNManager/ImportExcelToNPIPricing',
        getNpiPricing: '/NPI/NPIProcess/GetNPIPricing?Npiid=',
        saveNpiPricing: '/NPI/NPIProcess/SaveNPIPricing'
    }

    public static SpareParts = {
        exportCFN: '/NPI/NPICFNManager/ExportNPISparepartsToExcel',
        importCFN: '/NPI/NPICFNManager/ImportExcelToNPISpareparts',
    }
}


