aftercqzm(file) {
      lrz(file.content).then(rst => {
        // 压缩后文件大小
        file = rst.file;
        let file = new window.File([file], name, {
          type: file.type
        }); //把blob转化成file
        let fd = new FormData();
        if (file && file.length) {
          // 判断是否是多图上传 多图则循环添加进去
          file.forEach(item => {
            fd.append("files", item); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
            fd.append("fileType", "IMAGE");
          });
        } else {
          fd.append("files", file);
          fd.append("fileType", "IMAGE");
        }
        this.http({
          ...this.api.getProduct.moreLoader,
          data: fd
        })
          .then(res => {
            Toast("上传成功");
            console.log(res.data[0].fileUrl);
            this.uploadImages = [...this.uploadImages, res.data[0].fileUrl];
            if (this.uploadImages.length == 6) {
              this.showo = false;
            }
            console.log(res);
            console.log(this.uploadImages);
          })
          .catch(err => {
            this.$dialog({
              title: "提示",
              content: "上传失败",
              closeOnClickModal: false,
              noCancelBtn: true,
              onOkBtn(event) {
                //确定按钮点击事件
                this.close(); //关闭对话框
              }
            });
          });
      });
    },