import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        const details = this.props.details;

        if (details) {     // 如果有 details，则为修改页面
            const contentBlock = htmlToDraft(details);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        } else {
            this.state = {      // 如果没有details，值为undefined，则为添加页面
                editorState: EditorState.createEmpty(),
            };
        }
    }

    // state = {
    //     editorState: EditorState.createEmpty(),
    // }

    getDetails = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const {editorState} = this.state;
        // console.log(this.props.details)
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border: '1px solid #0084FF', paddingLeft: 20, height: 200}}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*<textarea*/}
                {/*    disabled*/}
                {/*    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </div>
        );
    }
}
