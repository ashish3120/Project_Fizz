import * as prismic from "@prismicio/client";
import sm from "../slicemachine.config.json";
import pagesData from "./config/prismic-data.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = sm.repositoryName;

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 */
const routes: prismic.ClientConfig["routes"] = [
  { type: "page", path: "/", uid: "home" },
  { type: "page", path: "/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint || repositoryName, {
    routes,
    ...config,
  });

  client.getByUID = async (customType: string, uid: string) => {
    const doc = (pagesData as any[]).find(
      (d) => d.type === customType && d.uid === uid
    );
    if (doc) return doc as any;
    try {
      return await prismic.Client.prototype.getByUID.call(client, customType, uid);
    } catch {
      return (pagesData as any[])[0] as any;
    }
  };

  client.getSingle = async (customType: string) => {
    const doc = (pagesData as any[]).find((d) => d.type === customType);
    if (doc) return doc as any;
    try {
      return await prismic.Client.prototype.getSingle.call(client, customType);
    } catch {
      return (pagesData as any[])[0] as any;
    }
  };

  client.getAllByType = async (customType: string) => {
    const docs = (pagesData as any[]).filter((d) => d.type === customType);
    if (docs.length > 0) return docs as any;
    try {
      return await prismic.Client.prototype.getAllByType.call(client, customType);
    } catch {
      return pagesData as any;
    }
  };

  return client;
};


