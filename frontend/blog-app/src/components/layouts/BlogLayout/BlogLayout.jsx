import BlogNavbar from "./BlogNavbar";

function BlogLayout({ children, activeMenu }) {
  return (
    <div className="bg-white pb-10">
      <BlogNavbar activeMenu={activeMenu} />

      <div className="container mx-auto px-4 md:px-4 pt-[80px] md:pt-[84px]">
        {children}
      </div>
    </div>
  );
}

export default BlogLayout;
