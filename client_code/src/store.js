import createStore from 'react-waterfall';
import { getRandomString } from './util';

const deepCopy = e => JSON.parse(JSON.stringify(e));

const sidebarList = Array.from({ length: 10 }, (v, k) => k).map(i => ({
  id: i,
  content: `item - ${i}`,
}));

const config = {
  initialState: {
    articles: [],
    editorContent: [],
    toolboxContent: sidebarList,
    articleEditorStyle: {
      showSideBar: true,
      showCodeEditor: false,
    },
  },
  actionsCreators: {
    addArticle(props, actions, article) {
      const articles = deepCopy(props.articles);
      articles.push(article);
      return { articles };
    },
    onEditorDrop(props, actions, { src, dest }) {
      const newList = deepCopy(props.editorContent);
      const newItem = props.toolboxContent[src.index];
      newList.splice(dest.index, 0, { ...newItem, id: getRandomString() });
      return { editorContent: newList };
    },
    onEditorSwap(props, actions, { src, dest }) {
      const newList = deepCopy(props.editorContent);
      const [tempItem] = newList.splice(src.index, 1);
      newList.splice(dest.index, 0, tempItem);
      return { editorContent: newList };
    },
    onEditorDelete(props, actions, id) {
      const newList = deepCopy(props.editorContent);
      newList.splice(newList.findIndex(e => e.id === id), 1);
      return { editorContent: newList };
    },
    onEditorCopy(props, actions, id) {
      const newList = deepCopy(props.editorContent);
      const itemIndex = newList.findIndex(e => e.id === id);
      const item = newList[itemIndex];
      newList.splice(itemIndex, 0, { ...item, id: getRandomString() });
      return { editorContent: newList };
    },
    setCodeEditorVisibility(props, action, isVisible) {
      const { articleEditorStyle } = props;
      return {
        articleEditorStyle: {
          ...articleEditorStyle,
          showCodeEditor: isVisible,
        },
      };
    },
    toggleSidebar(props) {
      const { articleEditorStyle } = props;
      return {
        articleEditorStyle: {
          ...articleEditorStyle,
          showSideBar: !articleEditorStyle.showSideBar,
        },
      };
    },
  },
};
// 0 1 2 3 4
export const { Provider, connect, actions } = createStore(config);
