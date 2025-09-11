import NotFound from "@/component/notFound";
import {
  baseURL,
  webviewURL,
  appDefaultHeader,
  appHeaderKey1,
  appHeaderKey2,
} from "@/config";
import Head from "next/head";

function ShareNeed(props) {
  const { data, needId, userCode } = props;

  console.log(data,'---DATA---')

  // console.log(data?.titleTags?.join(", "),'propp')
  const formattedTitleTags =
  data?.titleTags?.length === 1
    ? data?.titleTags?.[0]
    : data?.titleTags?.join(", ");

  const truncatedTitleTags =
  formattedTitleTags?.length > 32
    ? `${formattedTitleTags?.substring(0, 32)}...`
    : formattedTitleTags;

  if (!userCode && !needId) {
    return <NotFound />;
  }
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta property="og:title" content={data.needDescription || "No Description Added"} key="title" /> */}
        <meta
          property="og:title"
          content={
            data?.needType === "introduction"
            ? `Open to collaborate on ${truncatedTitleTags}`
            : data.needDescription ||`${data?.firstname} needs help with something. Tap to know more!`
          }
          key="title"
        />

        {data?.otherTags?.length && (
          <meta
            property="og:description"
            content={`Tags: ${data?.otherTags?.join(", ")}`}
            key="description"
          />
        )}
        <meta
          property="og:image"
          content={data?.needImageURL ?? "/"}
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={`${webviewURL}my-bio/needs/need?needId=${needId}&userCode=${userCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}
// https://demo1.elred.io/my-bio/leads/responding-leads?leadId=64face0939333f74a6861907&userCode=63aad78bb38aa1d755b49561&t=858659
// https://demo1.elred.io/my-bio/needs/need?needId=64facc3139333f74a686139f&userCode=63aad78bb38aa1d755b49561&t=882489

//test.elred.io/shareNeed?needId=64facc3139333f74a686139f&needOwner_userCode=63aad78bb38aa1d755b49561&t=960821
export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const needId = query?.needId ?? "";
  const needOwner_userCode = query?.needOwner_userCode ?? "";

  const response = await fetch(
    `${baseURL}webViewPreviewNeedScreenshot?userCode=${needOwner_userCode}&needId=${needId}`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        appDefaultHeader: Math.random() > 0.5 ? appHeaderKey1 : appHeaderKey2,
      },
    }
  );

  const data = await response.json();

  const result = data?.result && data?.result?.length && data?.result[0];


  return {
    props: { data: result, userCode: needOwner_userCode, needId }, // will be passed to the page component as props
  };
}
export default ShareNeed;
