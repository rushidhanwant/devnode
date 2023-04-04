import {Thread} from "../../server/types";
import { CommunityState, CompleteUserState } from "../../store";

export type Platform = {
    platformId : string,
    platformName : string,
    platformAvatar : string,
    platformUsername : string
}

export interface ThreadProps {
    thread: Thread;
}

export interface CreateThreadProps {
    title:string,
    open:boolean,
    onClose():void
    community: {
        communityName: string;
        communityId: string;
    },
    onComplete():void,
}
