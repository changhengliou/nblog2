import createStore from 'react-waterfall';
import { EditorState } from 'draft-js';
import { List, Map } from 'immutable';
import { stateFromHTML } from 'draft-js-import-html';
import { getRandomString } from './util';

const deepCopy = e => JSON.parse(JSON.stringify(e));

const sidebarList = [
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_071-7c619b64c9853519219e992a662089981337a6d8b7f27e1b554ff39353706dd8.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_001-d69ae6136ac5e425445ae138b07dc8115d09fd71a228165475ddda96a3480048.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_021-81f882167aee5868f36b7a46a20044fc08bccca054840341b4513157097f1f32.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_021-81f882167aee5868f36b7a46a20044fc08bccca054840341b4513157097f1f32.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_031-b3823812709f5bba0ed7c55e866f2df5a364ebb895d76a25399fb70999279e5d.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_041-97f0ce8e084f2525f17dba9aebe5e79383a4f5fb024b0723af75d48ea834d0f0.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_051-eebd3d948bbd1b2e11b85ee74035b6159f373bc55900c7582e5bab1dbba3c686.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_061-39526d5fd4fbb24b5d5332334f21e3556f80dfab755b9db4271404cadd10772a.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/separator_001-da02607e5d1c9cadfdd63740893a16999d282007e93c3013ecc20550596f2925.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/separator_011-61a48ac6da8b34d55fe1892e678dd5e4af35b40e5b06f315bd25e235b4f68120.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/separator_021-ab1115971e0fdf0f1dcb58b0e79e4ea7915c3d97ba733a5abc02b55ba764e310.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/features_001-0d8767d14aa14f2c2732576f76b12bb1502c18235c66b19ced5ef8442a756abf.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/features_002-94e168910f0123379d7f0c3e984c9cef2ef2e1fbdf01d97b4d1f48e42fa2d68b.png',
  'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/features_003-0b93e7ab274bf585520232396e452161ff417455cdf4ff692717005d695c266c.png',
];

const template = `
  <div>
    <h2>First Name<h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officiae deserunt mollit anim id est laborum.</p>
    <p>
      <span><i class="fa fa-facebook"></i></span>
      <span><i class="fa fa-google"></i></span>
      <span><i class="fa fa-twitter"></i></span>
      <span><i class="fa fa-linkedin"></i></span>
      <span><i class="fa fa-instagram"></i></span>
    </p>
    <p>example@tw.ibm.com</p>
    <p>+886-960731378</p>
    <p>Taipei, Taiwan</p>
  </div>
`;

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
        {
          ...newItem,
          id: getRandomString(),
          editorState: EditorState.createWithContent(stateFromHTML(template)),
        }, // EditorState.createEmpty()
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
