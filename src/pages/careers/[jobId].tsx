import type { ParsedUrlQuery } from "querystring";
import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, NextPage } from "next";



import { getJobPost, getJobPosts } from "@cms/content-studio";



import Page from "@layout/common/page";
import { OpeningDetailsSection } from "@layout/job-post-page/opening-details-section";
import { OpeningHeader } from "@layout/job-post-page/opening-header";
import { OtherOpeningsSection } from "@layout/job-post-page/other-openings-section";

import { BottomSpacer } from "@components/bottom-spacer";

interface Props {
  opening: JobPost;
  relatedOpenings: JobPost[];
}

const JobPostPage: NextPage<Props> = ({
  opening,
  relatedOpenings,
}: Props): JSX.Element => {
  return (
    <Page title={opening.title}>
      <OpeningHeader image={opening.coverImage} />
      <OpeningDetailsSection opening={opening} />
      <OtherOpeningsSection otherOpenings={relatedOpenings} />
      <BottomSpacer />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> => {
  const opening = await getJobPost(
    (context.params as ParsedUrlQuery).jobId as string
  );
  const relatedOpenings = await getJobPosts(
    4,
    (context.params as ParsedUrlQuery).jobId as string
  );

  return {
    props: {
      opening,
      relatedOpenings,
    },
  };
};

const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const postings = await getJobPosts();
    const paths = postings.map((post) => ({ params: { jobId: post.id } }));

    return {
      paths: paths,
      fallback: false,
    };
  };

export { getStaticProps, getStaticPaths };
export default JobPostPage;