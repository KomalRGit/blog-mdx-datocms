import "../styles/Home.module.css";
import { StructuredText } from "react-datocms";
import Image from "next/image";
import { request } from "../lib/blogs";

const HOMEPAGE_QUERY = `{
  allBlogs {
    title
    id
    image {
      url
      height
      width
    }
    content {
      value
    }
  }
}
`;
export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
  });
  return {
    props: { data },
  };
}

export default function Home(props) {
  const { data } = props;
  return (
    <div className="blog">
      {" "}
      {data.allBlogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h1 style={{ textAlign: "center" }}>{blog.title}</h1>
            <div className="blog__img">
              <Image
                src={blog.image.url}
                alt="img"
                width={blog.image.width}
                height={blog.image.height}
              />
            </div>
            <StructuredText data={blog.content} />
            <hr />
          </div>
        );
      })}
    </div>
  );
  // return <StructuredText data={data.allBlogs[0].slug} />;
}
