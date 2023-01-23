import React, { useEffect, useState } from "react";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";

interface GetUserProp {
  client: ContentHubClient; // We type the client so that we get intellisense for the different clients.
  name: string
}

const UserInfo: React.FunctionComponent<GetUserProp> = ({ client, name }) => {
  const [nameValue, setNameValue] = useState<number>();

  const getUserName = async (): Promise<void> => {
    // We get the draft settings.
    const userName = await client.users.getUserIdAsync(name)

    if (userName) {
      setNameValue(userName);
    }
  };

  getUserName();

  return (
    <>

      {<pre>{nameValue}</pre>}
    </>
  );
};

export default UserInfo;