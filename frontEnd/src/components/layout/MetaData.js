import React from 'react'
import Helmet from "react-helmet"

const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  );
}

export default MetaData
//See React Helmet Use Once(React Helmet is a component library used to manage changes to the document head in a React application. It allows you to set meta tags, title, and other head elements dynamically, which is particularly useful for improving SEO, social media sharing, and ensuring a consistent user experience)
