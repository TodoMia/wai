<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" style="height:202px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                        <div class="xiugai" @click="changepsd">修改密码</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog v-loading="loading"  title="修改密码" :visible.sync="dialogFormVisible">
            <div class="changepwd">
                <el-input type="password" placeholder="原始密码" v-model="pwd1" @blur="pwdyz">
                    <i slot="suffix" 
                    :class="[tab == 2 ? 'el-input__icon el-icon-circle-close' : 'el-input__icon el-icon-circle-check']"
                    :style="{'color' : [tab == 2 ? 'crimson' : 'green']}" 
                    ></i>
                </el-input>
                <el-input type="password" placeholder="新密码" v-model="pwd2" ></el-input>
                <el-input type="password" placeholder="确认密码" v-model="pwd3" @input="newpwdyz">
                    <i slot="suffix" 
                    :class="[tab2 == 2 ? 'el-input__icon el-icon-circle-close' : 'el-input__icon el-icon-circle-check']"
                    :style="{'color' : [tab2 == 2 ? 'crimson' : 'green']}" 
                    ></i>
                </el-input>
                
            </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tijiao" :disabled="tjdisabled == 2" plain>提交</el-button>
            <el-button type="info" @click="quxiao" plain>取消</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            // tjdisabled:false,
            loading: false,
            dialogTableVisible: false,
            dialogFormVisible: false,

            aa:'disabled',
            tab: 2,
            tab2: 2,
            pwd1:'',
            pwd2:'',
            pwd3:'',
            name: localStorage.getItem('ms_username'),
        };
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        },
        tjdisabled(){
            if(this.tab == 1 && this.tab2 == 1){
                return 1
            }else{
                return 2 
            }
        }
    },
    methods: {
        changepsd(){
            this.dialogFormVisible = true
        },
        pwdyz(){
            var users = JSON.parse(localStorage.getItem("userinfo"))
            if(users.password == this.pwd1){
                this.tab = 1
            }else{
                this.tab = 2

            }
        },
        newpwdyz(){
            if(this.pwd2 == this.pwd3){
                this.tab2 = 1
            }else{
                this.tab2 = 2
                
            }
        },
        tijiao(){
            this.loading=true;
            var users = JSON.parse(localStorage.getItem("userinfo"))
              const postdata={
				username: users.username,
				newpwd: this.pwd3,
			  }
			  this.$http.post('/updatepwd',postdata)
			  .then((res)=>{
                this.loading=false;
                  console.log(res)
				if (res.data.code == '200') {
                //   localStorage.setItem('ms_username', this.param.username);
                  users.password=this.pwd3
                  var userinfo=JSON.stringify(users)
                  localStorage.setItem('userinfo', userinfo);
				  this.$message({
					message: '修改成功',
					type: 'success',
                  });
                  this.dialogFormVisible = false
                  this.pwd1=''
                  this.pwd2=''
                  this.pwd3=''
				}else{
                  this.$message.error('修改失败');
                  this.pwd1=''
                  this.pwd2=''
                  this.pwd3=''
				  return false;
				}
			  })
			  .catch(err => {
				console.error(err);
			  })
        },
        quxiao(){
            this.dialogFormVisible = false
        }
    },
    created: function(){
        var ss = JSON.parse(localStorage.getItem("userinfo"))
    }
};
</script>


<style scoped>
.changepwd{
    /* width: 100%; */
    padding: 20px;
    background-color: white;
}
.changepwd .el-input{
    margin: 5px;
}
.xiugai{
    color: #999;
    font-size: 14px;
    cursor: pointer;
    padding-right: 10px;
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
