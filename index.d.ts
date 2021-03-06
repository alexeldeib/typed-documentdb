/** The feed options and query methods.*/
export interface FeedOptions {

    /** Max number of items to be returned in the enumeration operation. */
    maxItemCount?: number;

    /** Opaque token for continuing the enumeration. */
    continuation?: string;

    /** Token for use with Session consistency. */
    sessionToken?: string;
}

/** The media options.*/
export interface MediaOptions {

    /** HTTP Slug header value. */
    slug?: string;

    /** HTTP ContentType header value. */
    contentType?: string;
}

/** Options that can be specified for a request issued to the DocumentDB servers. */
export interface RequestOptions {

    /** Indicates what is the pre trigger to be invoked before the operation. */
    preTriggerInclude?: string;

    /** Indicates what is the post trigger to be invoked after the operation. */
    postTriggerInclude?: string;

    /** Conditions Associated with the request. */
    accessCondition?: {

        /** Conditional HTTP method header type.*/
        type: string;

        /** Conditional HTTP method header value.*/
        condition: string
    };

    /** Specifies indexing directives (index, do not index ..etc).*/
    indexingDirective?: string;

    /** Consistency level required by the client. */
    consistencyLevel?: string;

    /** Token for use with Session consistency.*/
    sessionToken?: string;

    /** Expiry time (in seconds) for resource token associated with permission (applicable only for requests on permissions).*/
    resourceTokenExpirySeconds?: number;

    /** Disables the automatic id generation. If id is missing in the body and this option is true, an error will be returned. */
    disableAutomaticIdGeneration?: boolean;
}

/** The Sql query parameter. */
export interface SqlParameter {
    /** The name of the parameter. */
    name: string;
    
    /** The value of the parameter. */
    value: any;
}

/** The Sql query specification. */
export interface SqlQuerySpec {
    /** The body of the query. */
    query: string;
    
    /** The array of SqlParameters. */
    parameters: SqlParameter[];
}

/** Represents the error object returned from a failed query. */
export interface QueryError {

    /** The response code corresponding to the error. */
    code: number;

    /** A string representing the error information. */
    body: string; //{ code: string; message: string; };
}

/**
* The callback to execute after the request execution.
* @param error            -       Will contain error information if an error occurs, undefined otherwise.
* @param resource         -       An object that represents the requested resource (Db, collection, document ... etc) if no error happens.
* @param responseHeaders  -       An object that contain the response headers.
*/
export interface RequestCallback<TResult> {
    (error: QueryError, resource: TResult, responseHeaders: any): void;
}

/** Represents the result returned from a query. */
export interface QueryIterator<TResultRow> {

    toArray(callback: (error: QueryError, result: TResultRow[]) => void): void;
}

/** Reprents an object with a unique identifier. */
export interface UniqueId {

    /** The user-defined unique identifier for a document or other DocumentDB object (database, collection, procedure...) */
    id: string;
}

/** Represents the common meta data for all DocumentDB objects. */
export interface AbstractMeta extends UniqueId {

    /** The self link.*/
    _self: string;

    /** The time the object was created.*/
    _ts: string;

    _rid?: string;
    _etag?: string;

    _attachments?: string;
}

/** Represents a custom document for storing in DocumentDB  */
export interface NewDocument<TContent> extends UniqueId {

    /** A custom property for containing the actual JSON object representing the document. 
         * Define a custom property in order to disambiguate the JSON document from the metadata added by Azure.
        * This property is optional and the name is application-specific.
        */
    //doc: TContent;
}

/** Represents a document retrieved from storage. 
     * This differs from a new document by the properties in AbstractMeta, which are added by the system.
    */
export interface RetrievedDocument<TContent> extends NewDocument<TContent>, AbstractMeta {

}

/** Represents an offer in DocumentDB */
export interface Offer extends AbstractMeta {
}

/** Represents an attachment in DocumentDB */
export interface Attachment extends AbstractMeta {
    /** Media link associated with the attachment */
    media?: string;
    /** The MIME type associated with the attachment content */
    contentType?: string;
}

/** Represents an conflict in DocumentDB */
export interface Conflict extends AbstractMeta {
}

/** For typing permissions */
export enum PermissionMode {
    "None",
    "Read",
    "All"
}

/** Represents a permission in DocumentDB */
export interface Permission extends AbstractMeta, UniqueId {
    /** The mode of the permission, must be a value of PermissionMode */
    permissionMode: PermissionMode;
    resource: string;
}

/** Represents a user in DocumentDB. */
export interface User extends AbstractMeta, UniqueId {
}

/** Represents a udf in DocumentDB. */
export interface UserDefinedFunction extends AbstractMeta, UniqueId {
    /** The type of the udf, it should be one of the values of UserDefinedFunctionType */
    userDefinedFunctionType: string;

    /** Represents the body of the udf, it can be passed as stringified too. */
    body(...params: any[]): void;
}

/** Represents the meta data for an attachment. */
export interface AttachmentMeta extends AbstractMeta {
}

/** Represents the meta data for a collection. */
export interface CollectionMeta extends AbstractMeta {
}

/** Represents an conflict in DocumentDB */
export interface ConflictMeta extends AbstractMeta {
}

/** Represents the meta data for a database. */
export interface DatabaseMeta extends AbstractMeta {
}

    /** Represents the meta data for media. */
export interface MediaMeta extends AbstractMeta {
}

/** Represents the meta data for an offer. */
export interface OfferMeta extends AbstractMeta {
}

/** Represents the meta data for a permission. */
export interface PermissionMeta extends AbstractMeta {
}

/** Represents the meta data for a stored procedure. */
export interface ProcedureMeta extends AbstractMeta {
}

/** Represents the meta data for a user. */
export interface UserMeta extends AbstractMeta {
}

/** Represents the meta data for a udf. */
export interface UserDefinedFunctionMeta extends AbstractMeta {
}

/** Represents the meta data for a trigger. */
export interface TriggerMeta extends AbstractMeta {
}

/** An object that is used for authenticating requests and must contains one of the options. */
export interface AuthOptions {

    /** The authorization master key to use to create the client. */
    masterKey?: string;

    /** An object that contains resources tokens. Keys for the object are resource Ids and values are the resource tokens.*/
    resourceTokens?: any;

    /** An array of {@link Permission} objects. */
    permissionFeed?: any[];
}

/** Represents a DocumentDB stored procecedure. */
export interface Procedure extends UniqueId {

    /** The function representing the stored procedure. */
    body(...params: any[]): void;
}

/** Represents a DocumentDB trigger. */
export interface Trigger extends UniqueId {
    /** The type of the trigger. Should be either 'pre' or 'post'. */
    triggerType: string;
    
    /** The trigger operation. Should be one of 'all', 'create', 'update', 'delete', or 'replace'. */
    triggerOperation: string;
    
    /** The function representing the trigger. */
    body(...params: any[]): void;
}

/** Represents DocumentDB collection. */
export interface Collection extends UniqueId {

    indexingPolicy?: IndexingPolicy;
}

/** The Indexing Path
* <p> Indexing paths hints to optimize indexing. <br>
*     Indexing paths allow tradeoff between indexing storage and query performance
* </p>
*/
interface IndexingPath {

    /** The indexing type(range or hash) {@link IndexType}.*/
    IndexType: string;

    /** Path to be indexed.*/
    Path: string;

    /** Precision for this particular Index type for numeric data. */
    NumericPrecision: number;

    /** Precision for this particular Index type for string data. */
    StringPrecision: number;
}

/**  The Indexing Policy represents the indexing policy configuration for a collection. */
interface IndexingPolicy {

    /** Specifies whether automatic indexing is enabled for a collection.
        <p>In automatic indexing, documents can be explicitly excluded from indexing using {@link RequestOptions}.
            In manual indexing, documents can be explicitly included. </p> */
    automatic: boolean;

    /** The indexing mode (consistent or lazy) {@link IndexingMode}. */
    indexingMode: string;

    /** An array of {@link IndexingPath} represents The paths to be incuded for indexing. */
    IncludedPath: IndexingPath[];

    /** An array of strings representing the paths to be excluded from indexing. */
    ExcludedPaths: string[];
}

/** Provides a client-side logical representation of the Azure DocumentDB database account. This client is used to configure and execute requests against the service.
     */
export class DocumentClient {
    /**
     * Constructs a DocumentClient.
     * @param urlConnection           - The service endpoint to use to create the client.
     * @param auth                    - An object that is used for authenticating requests and must contains one of the options.
     * @param [connectionPolicy]      - An instance of {@link ConnectionPolicy} class. This parameter is optional and the default connectionPolicy will be used if omitted.
     * @param [consistencyLevel]      - An optional parameter that represents the consistency level. It can take any value from {@link ConsistencyLevel}.
    */
    constructor(urlConnection: string, auth: AuthOptions, connectionPolicy?: any, consistencyLevel?: string);

    /**
     * Create an attachment.
     * <p>
     * Each document may contain zero or more attachments. Attachments can be of any MIME type - text, image, binary data. 
     * These are stored externally in Azure Blob storage. Attachments are automatically deleted when the parent document is deleted.
     * </p>
     * @param documentLink    - The self-link of the document.
     * @param attachment          - Represents the body of the attachment. Can contain any number of user defined properties.
     * @param [options]         - The request options.
     * @param callback 			- The callback for the request.
     */
    public createAttachment(documentSelfLink: string, attachment: Attachment, options: RequestOptions, callback: RequestCallback<AttachmentMeta>): void;
    public createAttachment(documentSelfLink: string, attachment: Attachment, callback: RequestCallback<AttachmentMeta>): void;

    /**
     * Create an attachment (and upload it).
     * 
     * @param documentLink    - The self-link of the document.
     * @param attachment          - Represents the body of the attachment. Can contain any number of user defined properties.
     * @param [options]         - The request options.
     * @param callback 			- The callback for the request.
     */
    public createAttachmentAndUploadMedia(documentSelfLink: string, attachment: Attachment, options: MediaOptions, callback: RequestCallback<AttachmentMeta>): void;
    public createAttachmentAndUploadMedia(documentSelfLink: string, attachment: Attachment, callback: RequestCallback<AttachmentMeta>): void;

    /**
     * Creates a collection.
     * <p>
     * A collection is a named logical container for documents. <br>
     * A database may contain zero or more named collections and each collection consists of zero or more JSON documents. <br>
     * Being schema-free, the documents in a collection do not need to share the same structure or fields. <br>
     * Since collections are application resources, they can be authorized using either the master key or resource keys. <br>
     * </p>
     * @param databaseLink  - The self-link of the database.
     * @param body          - Represents the body of the collection.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
     */
    public createCollection(databaseLink: string, body: Collection, options: RequestOptions, callback: RequestCallback<CollectionMeta>): void;
    public createCollection(databaseLink: string, body: Collection, callback: RequestCallback<CollectionMeta>): void;

    /** Send a request for creating a database. 
     * <p>
     *  A database manages users, permissions and a set of collections.  <br>
     *  Each Azure DocumentDB Database Account is able to support multiple independent named databases, with the database being the logical container for data. <br>
     *  Each Database consists of one or more collections, each of which in turn contain one or more documents. Since databases are an an administrative resource, the Service Master Key will be required in order to access and successfully complete any action using the User APIs. <br>
     * </p>
     * @param body      - A json object that represents The database to be created.
     * @param [options] - The request options.
     * @param callback  - The callback for the request.
    */
    public createDatabase(body: UniqueId, options: RequestOptions, callback: RequestCallback<DatabaseMeta>): void;
    public createDatabase(body: UniqueId, callback: RequestCallback<DatabaseMeta>): void;

    /**
     * Create a document.
     * <p> 
     * There is no set schema for JSON documents. They may contain any number of custom properties as well as an optional list of attachments. <br>
     * A Document is an application resource and can be authorized using the master key or resource keys
     * </p>
     * @param collectionLink    - The self-link of the collection.
     * @param document          - Represents the body of the document. Can contain any number of user defined properties.
     * @param [options]         - The request options.
     * @param callback 			- The callback for the request.
     */
    public createDocument<TDocument>(collectionSelfLink: string, document: NewDocument<TDocument>, options: RequestOptions, callback: RequestCallback<RetrievedDocument<TDocument>>): void;
    public createDocument<TDocument>(collectionSelfLink: string, document: NewDocument<TDocument>, callback: RequestCallback<RetrievedDocument<TDocument>>): void;

    /**
     * Create a Permission.
     * <p>
     * A permission represents a per-User Permission to access a specific resource e.g. Document or Collection. 
     * </p>
     * @param userLink    - The self-link of the user.
     * @param permission         - Represents the body of the permission.
     * @param [options]         - The request options.
     * @param callback          - The callback for the request.
     */
    public createPermission(collectionLink: string, permission: Permission, options: RequestOptions, callback: RequestCallback<PermissionMeta>): void;
    public createPermission(collectionLink: string, permission: Permission, callback: RequestCallback<PermissionMeta>): void;

    /**
     * Create a StoredProcedure.
     * <p>
     * DocumentDB allows stored procedures to be executed in the storage tier, directly against a document collection. The script <br>
     * gets executed under ACID transactions on the primary storage partition of the specified collection. For additional details, <br>
     * refer to the server-side JavaScript API documentation. 
     * </p>
     * @param collectionLink    - The self-link of the collection.
     * @param procedure         - Represents the body of the stored procedure.
     * @param [options]         - The request options.
     * @param callback          - The callback for the request.
     */
    public createStoredProcedure(collectionLink: string, procedure: Procedure, options: RequestOptions, callback: RequestCallback<ProcedureMeta>): void;
    public createStoredProcedure(collectionLink: string, procedure: Procedure, callback: RequestCallback<ProcedureMeta>): void;
    
    /**
     * Create a trigger.
     * <p>
     * DocumentDB supports pre and post triggers defined in JavaScript to be executed on creates, updates and deletes. <br>
     * For additional details, refer to the server-side JavaScript API documentation.
     * </p>
     * @param collectionLink  - The self-link of the collection.
     * @param trigger         - Represents the body of the trigger.
     * @param [options]       - The request options.
     * @param callback        - The callback for the request.
     */
    public createTrigger(collectionLink: string, trigger: Trigger, options: RequestOptions, callback: RequestCallback<TriggerMeta>): void;
    public createTrigger(collectionLink: string, trigger: Trigger, callback: RequestCallback<TriggerMeta>): void;

    /**
     * Create a database user.
     * @param databaseLink  - The self-link of the database.
     * @param user         - Represents the body of the user.
     * @param [options]       - The request options.
     * @param callback        - The callback for the request.
     */
    public createUser(databaseLink: string, user: User, options: RequestOptions, callback: RequestCallback<UserMeta>): void;
    public createUser(databaseLink: string, user: User, callback: RequestCallback<UserMeta>): void;

    /**
     * Create a udf.
     * <p>
     * DocumentDB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers.
     * For additional details, refer to the server-side JavaScript API documentation. 
     * </p>
     * @param collectionLink  - The self-link of the collection.
     * @param udf         - Represents the body of the udf.
     * @param [options]       - The request options.
     * @param callback        - The callback for the request.
     */
    public createUserDefinedFunction(collectionLink: string, udf: UserDefinedFunction, options: RequestOptions, callback: RequestCallback<UserDefinedFunctionMeta>): void;
    public createUserDefinedFunction(collectionLink: string, udf: UserDefinedFunction, callback: RequestCallback<UserDefinedFunctionMeta>): void;

    /**
     * Delete the attachment object.
     * @param attachmentLink    - The self-link of the attachment.
     * @param [options]         - The request options.
     * @param callback          - The callback for the request. 
    */
    public deleteAttachment(attachmentLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteAttachment(attachmentLink: string, callback: RequestCallback<void>): void;

        /**
     * Delete the collection object.
     * @param collectionLink    - The self-link of the collection.
     * @param [options]         - The request options.
     * @param callback          - The callback for the request. 
    */
    public deleteCollection(collectionLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteCollection(collectionLink: string, callback: RequestCallback<void>): void;

    /**
     * Delete the Conflict object.
     * @param ConflictLink    - The self-link of the Conflict.
     * @param [options]         - The request options.
     * @param callback          - The callback for the request. 
    */
    public deleteConflict(ConflictLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteConflict(ConflictLink: string, callback: RequestCallback<void>): void;

    /**
     * Delete the database object.
     * @param databaseLink  - The self-link of the database.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request. 
    */
    public deleteDatabase(databaseLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteDatabase(databaseLink: string, callback: RequestCallback<void>): void;

    /**
     * Delete the document object.
     * @param documentLink  - The self-link of the document.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request. 
    */
    public deleteDocument(documentLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteDocument(documentLink: string, callback: RequestCallback<void>): void;
    
    /**
     * Delete the permission object.
     * @param permissionLink  - The self-link of the permission.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request. 
    */
    public deletePermission(permissionLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deletePermission(permissionLink: string, callback: RequestCallback<void>): void;

    /**
     * Delete the StoredProcedure object.
     * @param procedureLink - The self-link of the stored procedure.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
    */
    public deleteStoredProcedure(procedureLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteStoredProcedure(procedureLink: string, callback: RequestCallback<void>): void;
    
    /**
     * Delete the trigger object.
     * @param triggerLink - The self-link of the stored trigger.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
    */
    public deleteTrigger(triggerLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteTrigger(triggerLink: string, callback: RequestCallback<void>): void;

    /**
     * Delete the user object.
     * @param userLink - The self-link of the stored user.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
    */
    public deleteUser(userLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteUser(userLink: string, callback: RequestCallback<void>): void;

    /**
     * Delete the udf object.
     * @param udfLink - The self-link of the stored udf.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
    */
    public deleteUserDefinedFunction(udfLink: string, options: RequestOptions, callback: RequestCallback<void>): void;
    public deleteUserDefinedFunction(udfLink: string, callback: RequestCallback<void>): void;

    /**
     * Execute the StoredProcedure represented by the object.
     * @param procedureLink - The self-link of the stored procedure.
     * @param [params]      - Represents the parameters of the stored procedure.
     * @param callback      - The callback for the request.
     */
    public executeStoredProcedure<TDocument>(procedureLink: string, callback: RequestCallback<TDocument>): void;
    public executeStoredProcedure<TDocument>(procedureLink: string, params: any[], callback: RequestCallback<TDocument>): void;
    public executeStoredProcedure<TDocument>(procedureLink: string, options: RequestOptions, callback: RequestCallback<TDocument>): void;
    public executeStoredProcedure<TDocument>(procedureLink: string, params: any[], options: RequestOptions, callback: RequestCallback<TDocument>): void;

    /** 
     * Lists all databases that satisfy a query. 
     * @param query     - A SQL query string.
     * @param [options] - The feed options.
     * @returns         - An instance of QueryIterator to handle reading feed.
     */
    public queryDatabases(query: string | SqlQuerySpec): QueryIterator<DatabaseMeta>;

    /**
     * Query the collections for the database.
     * @param databaseLink  - The self-link of the database.
     * @param query         - A SQL query string.
     * @param [options]     - Represents the feed options.
     * @returns             - An instance of queryIterator to handle reading feed.
     */
    public queryCollections(databaseLink: string, query: string | SqlQuerySpec): QueryIterator<CollectionMeta>;

    /**
     * Query the storedProcedures for the collection.
     * @param collectionLink    - The self-link of the collection.
     * @param query             - A SQL query string.
     * @param [options]         - Represents the feed options.
     * @returns                 - An instance of queryIterator to handle reading feed.
     */
    public queryStoredProcedures(collectionLink: string, query: string | SqlQuerySpec): QueryIterator<ProcedureMeta>;

    /**
    * Query the documents for the collection.
    * @param collectionLink - The self-link of the collection.
    * @param query          - A SQL query string.
    * @param [options]      - Represents the feed options.
    * @returns              - An instance of queryIterator to handle reading feed.
    */
    public queryDocuments<TDocument>(collectionLink: string, query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<RetrievedDocument<TDocument>>;

    /**
     * Query the triggers for the collection.
     * @param {string} collectionLink         - The self-link of the collection.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryTriggers(collectionLink: string, query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<TriggerMeta>;
    
    /**
     * Replace the attachment object.
     * @param attachmentLink - The self-link of the attachment.
     * @param attachment     - Represent the new attachment body.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
     */
    public replaceAttachment(attachmentLink: string, attachment: Attachment, options: RequestOptions, callback: RequestCallback<AttachmentMeta>): void;
    public replaceAttachment(attachmentLink: string, attachment: Attachment, callback: RequestCallback<AttachmentMeta>): void;

        /**
     * Replace the collection object.
     * @param collectionLink - The self-link of the document collection.
     * @param collection     - Represent the new document collection body.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
     */
    public replaceCollection(collectionLink: string, collection: Collection, options: RequestOptions, callback: RequestCallback<CollectionMeta>): void;
    public replaceCollection(collectionLink: string, collection: Collection, callback: RequestCallback<CollectionMeta>): void;

    /**
     * Replace the document object.
     * @param {string} documentLink      - The self-link of the document.
     * @param {object} document          - Represent the new document body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceDocument<TDocument>(documentLink: string, document: NewDocument<TDocument>, options: RequestOptions, callback: RequestCallback<RetrievedDocument<TDocument>>): void;
    public replaceDocument<TDocument>(documentLink: string, document: NewDocument<TDocument>, callback: RequestCallback<RetrievedDocument<TDocument>>): void;

    /**
     * Replace the offer object.
     * @param {string} offerLink      - The self-link of the offer.
     * @param {object} offer          - Represent the new offer body.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceOffer(offerLink: string, offer: Offer, callback: RequestCallback<Offer>): void;

    /**
     * Replace the permission object.
     * @param {string} permissionLink      - The self-link of the permission.
     * @param {object} permission          - Represent the new permission body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replacePermission(permissionLink: string, permission: Permission, options: RequestOptions, callback: RequestCallback<Permission>): void;
    public replacePermission(permissionLink: string, permission: Permission, callback: RequestCallback<Permission>): void;

        /**
     * Replace the StoredProcedure object.
     * @param procedureLink - The self-link of the stored procedure.
     * @param procedure     - Represent the new procedure body.
     * @param [options]     - The request options.
     * @param callback      - The callback for the request.
     */
    public replaceStoredProcedure(procedureLink: string, procedure: Procedure, options: RequestOptions, callback: RequestCallback<ProcedureMeta>): void;
    public replaceStoredProcedure(procedureLink: string, procedure: Procedure, callback: RequestCallback<ProcedureMeta>): void;

    /**
     * Replace the trigger object.
     * @param {string} triggerLink      - The self-link of the trigger.
     * @param {object} trigger          - Represent the new trigger body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceTrigger(triggerLink: string, trigger: Trigger, options: RequestOptions, callback: RequestCallback<Trigger>): void;
    public replacetrigger(TriggerLink: string, trigger: Trigger, callback: RequestCallback<Trigger>): void;

    /**
     * Replace the user object.
     * @param {string} userLink      - The self-link of the user.
     * @param {object} user          - Represent the new user body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceUser(userLink: string, user: User, options: RequestOptions, callback: RequestCallback<UserMeta>): void;
    public replaceUser(userLink: string, user: User, callback: RequestCallback<UserMeta>): void;

    /**
     * Replace the udf object.
     * @memberof DocumentClient
     * @instance
     * @param {string} udfLink           - The self-link of the user defined function.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceUserDefinedFunction(udfLink: string, udf: UserDefinedFunction, options: RequestOptions, callback: RequestCallback<UserDefinedFunctionMeta>): void; 
    public replaceUserDefinedFunction(udfLink: string, udf: UserDefinedFunction, callback: RequestCallback<UserDefinedFunctionMeta>): void; 

    /**
     * Update the media object.
     * @param {string} mediaLink      - The self-link of the media in the attachment.
     * @param {object} readableStream          - The stream that represents the media itself that needs to be uploaded.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public updateMedia(mediaLink: string, readableStream: any, options: MediaOptions, callback: RequestCallback<MediaMeta>): void;
    public updateMedia(mediaLink: string, readableStream: any, callback: RequestCallback<MediaMeta>): void;

    /**
     * Reads an Attachment object.
     * @memberof DocumentClient
     * @instance
     * @param {string} attachmentLink    - The self-link of the attachment.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
    */
    public readAttachment(attachmentLink: string, options: RequestOptions, callback: RequestCallback<AttachmentMeta>): void; 
    public readAttachment(attachmentLink: string, callback: RequestCallback<AttachmentMeta>): void;

    /** Reads a database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink         - The self-link of the database.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
    */
    public readDatabase(databaseLink: string, options: RequestOptions, callback: RequestCallback<DatabaseMeta>): void;
    public readDatabase(databaseLink: string, callback: RequestCallback<DatabaseMeta>): void;

    /**
     * Reads a collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink       - The self-link of the collection.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public readCollection(collectionLink: string, options: RequestOptions, callback: RequestCallback<CollectionMeta>): void; 
    public readCollection(collectionLink: string, callback: RequestCallback<CollectionMeta>): void; 

    /**
     * Reads a document.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink         - The self-link of the document.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public readDocument<TDocument>(documentLink: string, options: RequestOptions, callback: RequestCallback<RetrievedDocument<TDocument>>): void;
    public readDocument<TDocument>(documentLink: string, callback: RequestCallback<RetrievedDocument<TDocument>>): void;

    /**
     * Reads media.
     * @memberof DocumentClient
     * @instance
     * @param {string} mediaLink          - The self-link of the media.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readMedia(mediaLink: string, callback: RequestCallback<MediaMeta>): void;

    /**
     * Reads an offer.
     * @memberof DocumentClient
     * @instance
     * @param {string} offerLink          - The self-link of the offer.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readOffer(offerLink: string, callback: RequestCallback<OfferMeta>): void;

    /**
     * Reads a permission.
     * @memberof DocumentClient
     * @instance
     * @param {string} permissionLink    - The self-link of the permission.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readPermission(permissionLink: string, options: RequestOptions, callback: RequestCallback<PermissionMeta>): void; 
    public readPermission(permissionLink: string, callback: RequestCallback<PermissionMeta>): void;

    /**
     * Reads a user.
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink          - The self-link of the user.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readUser(userLink: string, options: RequestOptions, callback: RequestCallback<UserMeta>): void;
    public readUser(userLink: string, callback: RequestCallback<UserMeta>): void;
    
    /**
     * Reads a trigger object.
     * @memberof DocumentClient
     * @instance
     * @param {string} triggerLink       - The self-link of the trigger.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readTrigger(triggerLink: string, options: RequestOptions, callback: RequestCallback<TriggerMeta>): void; 
    public readTrigger(triggerLink: string, callback: RequestCallback<TriggerMeta>): void; 
    
    /**
     * Reads a udf object.
     * @memberof DocumentClient
     * @instance
     * @param {string} udfLink           - The self-link of the user defined function.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readUserDefinedFunction(udfLink: string, options: RequestOptions, callback: RequestCallback<UserDefinedFunctionMeta>): void; 
    public readUserDefinedFunction(udfLink: string, callback: RequestCallback<UserDefinedFunctionMeta>): void; 

    /**
     * Reads a StoredProcedure object.
     * @memberof DocumentClient
     * @instance
     * @param {string} sprocLink         - The self-link of the stored procedure.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readStoredProcedure(sprocLink: string, options: RequestOptions, callback: RequestCallback<ProcedureMeta>): void; 
    public readStoredProcedure(sprocLink: string, callback: RequestCallback<ProcedureMeta>): void; 

    /**
     * Reads a conflict.
     * @memberof DocumentClient
     * @instance
     * @param {string} conflictLink      - The self-link of the conflict.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readConflict(conflictLink: string, options: RequestOptions, callback: RequestCallback<ConflictMeta>): void; 
    public readConflict(conflictLink: string, callback: RequestCallback<ConflictMeta>): void; 

    /** Lists all databases.
     * @memberof DocumentClient
     * @instance
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
    */
    public readDatabases(options: FeedOptions): QueryIterator<DatabaseMeta>; 
    public readDatabases(): QueryIterator<DatabaseMeta>; 

    /**
     * Get all collections in this database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink   - The self-link of the database.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readCollections(databaseLink: string, options: FeedOptions): QueryIterator<CollectionMeta>; 
    public readCollections(databaseLink: string): QueryIterator<CollectionMeta>; 
    
    /**
     * Get all documents in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readDocuments<TDocument>(collectionLink: string, options: FeedOptions): QueryIterator<RetrievedDocument<TDocument>>; 
    public readDocuments<TDocument>(collectionLink: string): QueryIterator<RetrievedDocument<TDocument>>; 
    
    /**
    * Get all attachments for this document.
    * @memberof DocumentClient
    * @instance
    * @param {string} documentLink   - The self-link of the document.
    * @param {FeedOptions} [options] - The feed options.
    * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
    */
    public readAttachments(documentLink: string, options: FeedOptions): QueryIterator<AttachmentMeta>; 
    public readAttachments(documentLink: string): QueryIterator<AttachmentMeta>; 
    
    /**
     * Get all users in this database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink       - The self-link of the database.
     * @param {FeedOptions} [feedOptions] - The feed options.
     * @returns {QueryIterator}           - An instance of queryIterator to handle reading feed.
     */
    public readUsers(databaseLink: string, options: FeedOptions): QueryIterator<UserMeta>; 
    public readUsers(databaseLink: string): QueryIterator<UserMeta>; 
    
    /**
     * Reads an offer.
     * @memberof DocumentClient
     * @instance
     * @param {string} offerLink          - The self-link of the offer.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public readOffers(options: FeedOptions): void;

    /**
     * Get all permissions for this user.
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink           - The self-link of the user.
     * @param {FeedOptions} [feedOptions] - The feed options.
     * @returns {QueryIterator}           - An instance of queryIterator to handle reading feed.
     */
    public readPermissions(userLink: string, options: FeedOptions): QueryIterator<PermissionMeta>; 
    public readPermissions(userLink: string): QueryIterator<PermissionMeta>; 
    
    /**
     * Get all triggers in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink   - The self-link of the collection.
     * @param {FeedOptions} [options]   - The feed options.
     * @returns {QueryIterator}         - An instance of queryIterator to handle reading feed.
     */
    public readTriggers(collectionLink: string, options: FeedOptions): QueryIterator<TriggerMeta>; 
    public readTriggers(collectionLink: string): QueryIterator<TriggerMeta>; 
    
    /**
     * Get all UserDefinedFunctions in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readUserDefinedFunctions(collectionLink: string, options: FeedOptions): QueryIterator<UserDefinedFunctionMeta>; 
    public readUserDefinedFunctions(collectionLink: string): QueryIterator<UserDefinedFunctionMeta>; 
    
    /**
     * Get all StoredProcedures in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readStoredProcedures(collectionLink: string, options: FeedOptions): QueryIterator<ProcedureMeta>; 
    public readStoredProcedures(collectionLink: string): QueryIterator<ProcedureMeta>; 
    
    /**
     * Get all conflicts in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of QueryIterator to handle reading feed.
     */
    public readConflicts(collectionLink: string, options: FeedOptions): QueryIterator<AbstractMeta>; 
    public readConflicts(collectionLink: string): QueryIterator<AbstractMeta>; 
}
