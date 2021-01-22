<template>
    <div class="login-wrap">
        <div class="ms-login">
            <!-- <div class="ms-title">后台管理系统</div> -->
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
			  const postdata={
				username: this.param.username,
				password: this.param.password,
			  }
			  this.$http.post('/login',postdata)
			  .then((res)=>{
                  console.log(res)
				if (res.data.code == '200') {
                  localStorage.setItem('ms_username', this.param.username);
                  var userinfo=JSON.stringify(res.data.user)
                  localStorage.setItem('userinfo', userinfo);
				  this.$message({
					message: '登录成功',
					type: 'success',
				  });
				  this.$router.push('/');
				}else{
				  this.$message.error(res.data.msg);
				  console.log('error submit!!');
				  return false;
				}
			  })
			  .catch(err => {
				console.error(err);
			  })
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 450px;
    margin: -120px 0 0 160px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
    /* background-color: #ebf3ff; */
    /* background-image: url(../../assets/img/login.png); */
    background-size: 100% 100%;
    overflow: hidden;
}
.el-input-group {
    height: 50px;
}
.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 50px;
    height: 50px;
}

.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 46px;
    font-size: 18px;
    margin-bottom: 10px;
    background-color: #5678e3;
    border-radius: 200px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.login-wrap >>> .el-input-group--prepend .el-input__inner, .el-input-group__append {
    height: 50px;
    /* background-color: rgb(233, 231, 231); */
}
</style>