<template>
  <div class="contain">
    <div class="header" style="height: 56px;">
      <span style="font-size:18px;">对战规则说明</span>
    </div>
    <div class="main">
      {{information.bussData}}
      <el-form :model="information" :rules="rules" ref="information" label-width="130px" class>
        <el-form-item label prop="bussData">
          <!-- <bg-editor 
                        :minHeight="400" 
                        :uploadUrl="upLoadUrl" 
                        :content="information.bussData"
                        @editorData='editorInfo'>
          </bg-editor>-->
          <div v-html="content" class="myTextEditor pl-34 pr-34 pt-40" v-if="showType=='add'"></div>

          <quill-editor
            v-else
            class="editor"
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </el-form-item>
        <el-form-item class v-if="showType=='add'">
          <el-button
            type="primary"
            @click="edit('eidt')"
            :loading="loading"
          >{{information.bussData!==''?'编辑':'保存' }}</el-button>
        </el-form-item>
        <el-form-item class="mt-120" v-else>
          <el-button type="primary" @click="goLeft('information')">返回</el-button>
          <el-button type="primary" @click="submitForm('information')" :loading="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
let CONSTANT = require("../../constant/constant.js");
let common = require("../../common.js");
import $ from "jquery";
export default {
  data() {
    return {
      content: null,
      id: "",
      showType: "",
      dialogImageUrl: "",
      dialogVisible: false,
      loading: false,
      // upload
      upLoadUrl: "",
      information: {},
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ] //工具菜单栏配置
        },
        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      },
      rules: {
        messageTitle: [
          { required: true, message: "请填写标题", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请填写详细内容", trigger: "change" }
        ]
      },
      loading: false
    };
  },
  components: {
    "bg-editor": () => import("../common/bg-editor.vue")
  },
  mounted() {
    this.getplatInfoDetail();
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  methods: {
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
    },
    edit() {
      this.showType = "edit";
    },
    goLeft() {
      this.showType = "add";
      (this.content = ""), this.getplatInfoDetail();
    },
    getplatInfoDetail() {
      const loading = this.$loading({
        lock: true,
        text: '正在加载中····',
        spinner: "el-icon-loading"
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
      let url = CONSTANT.URL.Admin.GetSysvar;
      let param = {};
      common.requestAjax(url, param, null, res => {
        let data = res.data;
        this.content = data.bussData;
        if (data.bussData) {
          this.showType = "add";
        }
      });
    },
    editorInfo(val) {
      this.information.content = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let url = CONSTANT.URL.Admin.AddSysvar;
          let data = {
            value: this.content
          };
          let param = JSON.stringify(data);
          common.requestAjax(url, param, null, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.loading = false;
              this.getplatInfoDetail();
              this.showType = "add";
            } else {
              this.$message({
                type: "error",
                message: res.data.errMsg
              });
              this.loading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped >
// @import '/static/bootstrap.css';
// @import '/book/static/bootstrap.css';
.contain {
  .editor {
    height: 300px;
  }
  .myTextEditor {
    width: 100%;
    height: 300px;
    border: 1px solid #eee;
  }
  .header {
    height: 46px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dedede;
    p {
      float: left;
      height: 36px;
      line-height: 36px;
      margin: 0 0 0 10px;
      font-size: 18px;
    }
    .el-button {
      float: right;
      margin-right: 5%;
    }
  }
  .main {
    // width:500px;
    max-width: 1200px;
    margin: 20px 0 0 40px;
    clear: both;
    .el-input,
    .el-select {
      width: 250px;
    }
    .avatar-uploader {
      .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
          border: 1px dashed #d9d9d9 !important;
          border-radius: 6px;
          margin-left: 6px;
        }
        .el-upload__input {
          display: none !important;
        }
        input[type="file"] {
          display: none;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
      .el-upload:hover {
        border-color: #20a0ff;
      }
    }
    .modal-body {
      .note-image-input {
        display: block;
      }
    }
  }
}
</style>
