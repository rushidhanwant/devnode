// This is an auto-generated file, do not edit manually
import type { RuntimeCompositeDefinition } from "@composedb/types";
export const definition: RuntimeCompositeDefinition = {
  models: {
    Thread: {
      id: "kjzl6hvfrbw6c9aofa8penmje3t7ulzvrgdsm7mqiep6h2p7xps46717pl5vk73",
      accountRelation: { type: "list" },
    },
    Comment: {
      id: "kjzl6hvfrbw6c9fi3m3qzse6jxkloa84tp4xqk2qp4031qqbhpeg890admje9bu",
      accountRelation: { type: "list" },
    },
  },
  objects: {
    Thread: {
      title: { type: "string", required: true },
      community: { type: "string", required: true },
      createdAt: { type: "datetime", required: true },
      author: { type: "view", viewType: "documentAccount" },
    },
    Comment: {
      text: { type: "string", required: true },
      threadID: { type: "streamid", required: true },
      createdAt: { type: "datetime", required: true },
      author: { type: "view", viewType: "documentAccount" },
    },
  },
  enums: {},
  accountData: {
    threadList: { type: "connection", name: "Thread" },
    commentList: { type: "connection", name: "Comment" },
  },
};
