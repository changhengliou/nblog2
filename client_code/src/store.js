import createStore from 'react-waterfall';
import { List, Map } from 'immutable';
import { Value } from 'slate';
import { getRandomString, deepCopy } from './util';
import { profile } from './richeditor/schema';
import { htmlConverter } from './richeditor/tags';

const config = {
  initialState: {
    articles: [],
    editors: List([]),
    toolboxContent: [
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_071-7c619b64c9853519219e992a662089981337a6d8b7f27e1b554ff39353706dd8.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_001-d69ae6136ac5e425445ae138b07dc8115d09fd71a228165475ddda96a3480048.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/profile_011-bac37a81a0df0a024306aec19d6a1936fcce09b194de69f612f9eae6317d99b3.png',
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
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/experiences_013-fed5ad0918abe1b8396e2fadfde035a25411cb7a57a597b74b4f3434c94d1988.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/experiences_014-78a6fc223ad8c0c7c1a0d9dde93ded8d780c1b3aec793df9851557b3ca46d75e.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/experiences_004-8fc0419ff66bd12f854aa8f8597e64ca5c7258a6d6a84520ecca9aad10e35bac.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraphs_001-0d7a3189a115da210f97eb8dc3fba35722f9573102ac70ae6184e4aa097b0ed5.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraphs_002-0c190b8709f3f7a7d7a259ea332be3a87d03fab87eef9a04a90b6e3443706682.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/projects_001-eed6436b8f5966e01562bbbd51a92da3ed2b5b72ed0494cf9bd5053a1676c748.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/projects_002-c1bf4e97cd090ffedd9a7dcbf3778e4cb715228ca0f1dd14b51295e648012860.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/projects_003-f4f31a2d1cec941c52ce536812e4e07d4c218d0e85403796574e890ade68d7a6.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/projects_011-b3367f4b4a2f46489be215a6681f1c37a5f5c329672c92800d10f65576b5b193.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/projects_012-b6cfc4f2987e3d71d68288e4db45fdf5114ea0eda3c0492de142b490b5907f51.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/projects_013-cc32008e37ed1e8ff755e5af4174db05511ea28ad2e73320fa2dea28bf7ef0bf.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/projects_021-46cbcfc807f85eae5ca00db72d0838b8dfd253c9f2b27813a65104de833a6e61.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraph_image_001-405340fef8d1c4001858fac46da70087a2a4dd5cc07841cb0f17f44707b8274a.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraph_image_011-0ea1526a68abac7141e99d332f6ce5601417d4600ee1d96dba9b2ed55b387d06.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraph_image_021-e01a6d05117f1b5dfda76e6154961ecafdb022c1be6a659bef96afe0f5724a0f.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraph_image_031-6f23868c6b63c4a488c8577680078e7a346b815c48f73211c506b537d8b37cbc.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraph_image_041-c173af98a971ea7f1cec16465e5ac887f1d269bace66e5b319002860bfa958a1.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraph_image_051-edbab8e08bdcff0f1aafbc4f1f2626f74eeb685e9c65fbbd398f2b46d8936ec4.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/paragraph_image_061-4f5e2c5bb6525ffa1cbb5e73cd6f29e2ebcdd1324ae4cc3adc75bae79085123d.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/video_021-1af20fde5f300e322b1cbcf7fb6509fd93580b7b488126b2ce1741d11536a71f.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/video_001-d346ae1e7bb93aa131891e578f88cfc07a50ced3ab59cbdde64a4ee78868fcb5.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/video_011-b1563821cf2f343b36a08dff89c019ccedb4898bed490b26550c077b8325f9ec.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/video_022-92a3f8bd8ae9fbab5831293c0dfe47247908f59026aa96896b489a79115239e8.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/call_to_action_001-c1131c356282b649db4fa0a9799464952ac71a4f2b2d61b305a0b33e2ea0e1ef.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/call_to_action_011-0496eea38abd6c88a98456717296f2b9512965767e5d6afd078f84bed7d528b0.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/call_to_action_021-ab6f13ad512bf82e79f1b96464d737914e33de2ae27af80be091d27ad9bf171a.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/call_to_action_031-e013bef0eba41398b3a09af98deb7017a535906b834fb57ad54802a8ccee44d4.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/slide_021-a0b5d5f776c10b39a50ef1c95f47eb2c86ad9cab42466f33b037625a12a64c4d.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/slide_001-174e7cf3a3f8cc865ada9d498735af0908df156aa4960b24dd0269d7291ac714.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/slide_011-2a1cf14d85d316fe6b4c435582e4f09d5b24b5a780625b96567afa2a90223984.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/quotes_001-16b7827b53720bbf687064e5a77e494b954ae1d6b76d2cc3ccefcd9b2abe7b40.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/quotes_002-169898ede41beee3babbd49dea4efc84a290d5a7183f30532a2df3c6a5b3233b.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/quotes_011-f9c50b14e56a4bdee7b6564a1b281c992ae66c6302ccd19827a347b622f652e4.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/quotes_021-38e1e5099c77c674e62f353c6d047868ca994a58b47142db19e1c1427d666e6f.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/readings_002-0f4b533ff593dd6c52aff8acface1d3b0f2c2910bbd6cf30f6435b8c2e3a678c.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/map_021-be613ef3e3ac74638e483933896a760d0e8e45656f4535f4ae9b8ab61bffa020.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/map_001-7b3975a146d8d2eec2e05fe90a80acf5eeaf9c869c657ac1439eee8ecfc4ddd0.png',
      'https://assets.cakeresume.com/assets/contentbuilder_assets/custom/thumbnails/additional/map_011-8ad65148f21bb7e15e34a72a3e861b60723c6de3ca66099fc8b5ca2f6f4ff32f.png',
    ],
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
      const { editors, toolboxContent } = props;
      const newItem = toolboxContent[src.index];
      const newList = editors.splice(dest.index, 0, Map(
        {
          ...newItem,
          id: getRandomString(),
          value: htmlConverter.deserialize(profile), // Value.fromJSON(blank),
        },
      ));
      return { editors: newList };
    },
    onEditorSwap(props, actions, { src, dest }) {
      let newList = props.editors;
      const tempItem = newList.get(src.index);
      newList = newList.remove(src.index);
      newList = newList.splice(dest.index, 0, tempItem);
      return { editors: newList };
    },
    onEditorDelete(props, actions, id) {
      let newList = props.editors;
      newList = newList.splice(newList.findIndex(e => e.get('id') === id), 1);
      return { editors: newList };
    },
    onEditorCopy(props, actions, id) {
      let newList = props.editors;
      const itemIndex = newList.findIndex(e => e.get('id') === id);
      newList = newList.splice(itemIndex, 0, Map({
        id: getRandomString(),
        value: Value.fromJSON(newList.get(itemIndex).get('value').toJSON()),
      }));
      return { editors: newList };
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
    onEditorStateChange(props, actions, { value, id }) {
      const { editors } = props;
      const index = editors.findIndex(e => e.get('id') === id);
      const item = editors.get(index).set('value', value);
      const newList = editors.set(index, item);
      return { editors: newList };
    },
    onCurrentEditorChange(props, actions, id) {
      return { currentEditor: id };
    },
  },
};
// 0 1 2 3 4
export const { Provider, connect, actions } = createStore(config);
