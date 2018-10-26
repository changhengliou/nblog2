import createStore from 'react-waterfall';
import { EditorState } from 'draft-js';
import { List, Map } from 'immutable';
import { getRandomString } from './util';

const deepCopy = e => JSON.parse(JSON.stringify(e));

const sidebarList = Array.from({ length: 10 }, (v, k) => k).map(i => ({
  id: i,
  content: `item - ${i}`,
}));

const config = {
  initialState: {
    articles: [],
    editorContent: List([]),
    toolboxContent: sidebarList,
    articleEditorStyle: {
      showSideBar: true,
      showCodeEditor: false,
    },
    currentEditor: null,
  },
  actionsCreators: {
    addArticle(props, actions, article) {
      const articles = deepCopy(props.articles);
      articles.push(article);
      return { articles };
    },
    onEditorDrop(props, actions, { src, dest }) {
      const { editorContent, toolboxContent } = props;
      const newItem = toolboxContent[src.index];

      const newList = editorContent.splice(dest.index, 0, Map(
        { ...newItem, id: getRandomString(), editorState: EditorState.createEmpty() },
      ));
      return { editorContent: newList };
    },
    onEditorSwap(props, actions, { src, dest }) {
      let newList = props.editorContent;
      const tempItem = newList.get(src.index);
      newList = newList.remove(src.index);
      newList = newList.splice(dest.index, 0, tempItem);
      return { editorContent: newList };
    },
    onEditorDelete(props, actions, id) {
      let newList = props.editorContent;
      newList = newList.splice(newList.findIndex(e => e.get('id') === id), 1);
      return { editorContent: newList };
    },
    onEditorCopy(props, actions, id) {
      let newList = props.editorContent;
      const itemIndex = newList.findIndex(e => e.get('id') === id);
      const item = newList.get(itemIndex).set('id', getRandomString());
      newList = newList.splice(itemIndex, 0, item);
      return { editorContent: newList };
    },
    // CodeEditor.js, EditorBlock.js
    setCodeEditorVisibility(props, action, isVisible) {
      const { articleEditorStyle } = props;
      return {
        articleEditorStyle: {
          ...articleEditorStyle,
          showCodeEditor: isVisible,
        },
      };
    },
    // ArticleEditorSidebar.js
    toggleSidebar(props) {
      const { articleEditorStyle } = props;
      return {
        articleEditorStyle: {
          ...articleEditorStyle,
          showSideBar: !articleEditorStyle.showSideBar,
        },
      };
    },
    onEditorStateChange(props, actions, { editorState, id }) {
      const { editorContent } = props;
      const index = editorContent.findIndex(e => e.get('id') === id);
      const item = editorContent.get(index).set('editorState', editorState);
      const newList = editorContent.set(index, item);
      return { editorContent: newList };
    },
    onCurrentEditorChange(props, actions, id) {
      return { currentEditor: id };
    },
  },
};
// 0 1 2 3 4
export const { Provider, connect, actions } = createStore(config);
