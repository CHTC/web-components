import {ArticleData} from "../../src/Article/types";

const markdownContent = `
# The Rise of Open Source Software

## Introduction

Open source software has revolutionized the way we develop and use technology. It has fostered a culture of collaboration and innovation, allowing developers from around the world to contribute to projects and improve software for everyone.

## What is Open Source Software?

Open source software is software with source code that anyone can inspect, modify, and enhance. Unlike proprietary software, which is controlled by a single company, open source software is developed in a decentralized and collaborative way.

## Benefits of Open Source

1. **Collaboration**: Developers from different backgrounds and expertise can work together on the same project.
2. **Transparency**: Users can see the source code and understand how the software works.
3. **Security**: With many eyes on the code, vulnerabilities can be spotted and fixed quickly.
4. **Cost**: Open source software is often free to use, reducing costs for individuals and businesses.

## Popular Open Source Projects

- **Linux**: An open source operating system that powers millions of servers, desktops, and mobile devices.
- **Apache**: A widely-used web server software.
- **Mozilla Firefox**: A popular web browser known for its speed and privacy features.
- **WordPress**: A content management system that powers over 30% of the web.

## Conclusion

Open source software has had a profound impact on the tech industry. It promotes a culture of sharing and continuous improvement, leading to better software and a more connected world.

## References

- [Open Source Initiative](https://opensource.org/)
- [Linux Foundation](https://www.linuxfoundation.org/)
- [Mozilla](https://www.mozilla.org/)

<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="flex: 0 0 100%; max-width: 100%; padding: 0.5rem;">
    <img src='https://raw.githubusercontent.com/CHTC/Articles/main/images/pratham.jpeg' style="max-width: 100%; height: auto; border-radius: 0.25rem;" alt="Pratham">
  </div>
  <div style="flex: 0 0 100%; max-width: 100%; padding: 0.5rem;">
    <img src='https://raw.githubusercontent.com/CHTC/Articles/main/images/fellows.jpeg' style="max-width: 100%; height: auto; border-radius: 0.25rem;" alt="Fellows">
  </div>
  <div style="flex: 0 0 100%; max-width: 100%; padding: 0.5rem;">
    <p>Fellows at their first presentation, introducing themselves and their projects.</p>
  </div>
</div>
`

const defaultArticle: ArticleData = {
	content: markdownContent,
	title: "Sample Article",
	author: "John Doe",
	date: new Date(),
	publish_on: ["htcondor"],
	type: "news",
	tag: ["chtc_featured_article"],
	image: {
		path: "https://placehold.co/600x400",
		alt: "Sample Image"
	},
	excerpt: "This is a sample article.",
	banner_src: "https://placehold.co/1200x300",
	banner_alt: "Sample Banner",
	canonical_url: "https://chtc.cs.wisc.edu/sample-article.html"
};

export default defaultArticle;
