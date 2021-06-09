import React, { Fragment, useState } from 'react';
import data from './data.json';

import './style.css';
const FileTree = () => {
  // setTree can be used on load data from api
  const [tree, setTree] = useState(data)

  const Folder = ({ node }) => {
    const [childrenNodes, setChildrenNodes] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
      let children = node.children.map((el) => tree.find(x => x.id === el))
      setChildrenNodes(children)
      setIsOpen(!isOpen)
    }
    const iconClass = isOpen ? "iconOpenFolder" : "iconCloseFolder"
    const content = isOpen ? "-" : "+"
    const wrapperContent = isOpen ? "wrapperIconMinuse" : "wrapperIconPluse"
    return (
      <ul className="container">
        <div className="wrapperFolder">
          <div onClick={handleClick} className={wrapperContent}><span>{content}</span></div>
          <span onClick={handleClick} className={iconClass}></span>
          <span onClick={handleClick}>{node.name}</span></div>
        {isOpen && (
          childrenNodes.map(node => {
            return GetNodeByType(node)
          }))
        }
      </ul>
    )

  }
  const File = ({ node }) => {
    const { name } = node
    return (<div className="wrapperFile">
      <div className="iconFile"></div>
      <li>{name}</li>
    </div>)
  }

  const GetNodeByType = (node) => {
    switch (node.type) {
      case "folder":
        return <Folder
          key={node.id}
          node={node}
        />
      case "file":
        return <File
          key={node.id}
          node={node}
        />
    }
  }

  const rootNode = tree && tree.find(x => x.id === "root")
  return (
    <Fragment>
      {rootNode && (
        <Folder
          node={rootNode}
        />
      )}
    </Fragment>
  )
}

export default FileTree;