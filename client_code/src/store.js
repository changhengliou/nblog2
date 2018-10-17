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
