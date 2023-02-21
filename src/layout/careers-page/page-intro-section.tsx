import {
  ContentGroup,
  type ContentGroupType,
} from "@layout/common/groups/content-group";

const PageIntroSection: React.FC<ContentGroupType> = (
  props: ContentGroupType
): JSX.Element => {
  return (
    <section className="main-grid-columns grid">
      <div className="col-content mx-auto w-[min(100%,_46.875rem)]">
        <ContentGroup {...props} alignment="center" />
      </div>
    </section>
  );
};

export { PageIntroSection };
