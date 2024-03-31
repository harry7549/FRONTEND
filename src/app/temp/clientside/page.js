"use client";

import withauth from "@/utils/withauth";

const clientSide = () => {
  return <h1>hello this is athonticated</h1>;
};
//THIS export will send this component to that and will work accordingly
export default withauth(clientSide);
