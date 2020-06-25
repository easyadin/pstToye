export class Media {
    // contains the properties of both video and audio
    public id: string;
    public alias: "psTf"; // a tag to easily find all audio in case downloaded to phone
    public mediaName: string; 
    public mediaType: string; // video | audio | devotional
    public streamUrl: string;
    public downloadUrl: string;
    public albumName: string; // if any 
    public userTestimony: string; // the user in context not all testimonies
    public isLiked: boolean;
    public isDownloaded: boolean; 
}
