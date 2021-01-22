<template>
    <div>
        <div class="search">
            <div>
                <label for="creatData">日期：</label>
                <div class="block riqi">
                     <el-date-picker  v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                      end-placeholder="结束日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <span class="chaxun" @click="chaxun">查询</span>
                <span class="chaxun" @click="upload">上传</span>
            </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%; height: 100%">
            <el-table-column prop="batchnum" label="ID" ></el-table-column>
            <el-table-column prop="filename" label="文件名" ></el-table-column>
            <el-table-column prop="creat_time" label="创建时间" ></el-table-column>
            <el-table-column prop="status" label="状态" >
                <template slot-scope="scope">
                    {{scope.row.status | showstatus}}
                  </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" :disabled="scope.row.status == 0" type="text" size="small">下载可营销</el-button> -->
                    <!-- <el-button @click="handleClick2(scope.row)" :disabled="scope.row.status == 0" type="text" size="small">下载不可营销</el-button> -->
                    <!-- <el-button @click="handleClick2(scope.row)" :disabled="scope.row.status == 0" type="text" style="color: tomato;"  size="small">删除</el-button> -->
                    <el-tooltip class="item" effect="dark" content="下载可营销" placement="top-start">
                        <el-button @click="handleClick(scope.row)" :disabled="scope.row.status == 0" type="primary" icon="el-icon-download" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下载不可营销" placement="top-start">
                        <el-button @click="handleClick2(scope.row)" :disabled="scope.row.status == 0" type="success" icon="el-icon-download" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button @click="deletClick(scope.row)" :disabled="scope.row.status == 0" type="danger" icon="el-icon-delete" circle></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-size="pagesize"
         layout="total, prev, pager, next" :total="totals">
      </el-pagination>

      <div class="upload" v-show="uploadshow">
            <span class="closeupload" @click="closeupload"><i class="el-icon-close"></i></span>
            <p class="title">上传文件</p><br>
            <el-upload
                class="upload-demo"
                drag
                action="http://119.23.48.180:8088/api/v1/uploadbd"
                :on-error="uploagerror"
                :on-success="handleAvatarSuccess"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
      </div>

    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            loading:false,
            uploadshow:false,
            currentPage: 1,
            value1: '',
            totals: 0,
            pagesize: 30,//每页3条
            start:0,
            end:0,
            tableData: [],
            alldata:[],
        };
    },
    filters: {
    showstatus: function (value) {
        if(value == '0'){
            return "已上传正在撞库"  
        }else if(value == '1'){
            return "撞库已完成"  
        }else{
            return "情况未知"  
        }		
      }
    },
    created: function(){
        this.chaxun()
    },
    methods: {
        chaxun(){
            this.end=this.pagesize
            this.currentPage1=1;
            this.loading = true
            if(this.value1 == null || this.value1 == ""){
                var date = new Date();
                // console.log(date)
                date.setDate(date.getDate() + 1)
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var d = date .getDate();
                if( month <10){
                    month = '0' + month;
                }
                var day = date.getDate();
                if( d < 10){
                    day = '0' + day;
                }
                var time = year + "-" + month + "-" + day;
                // console.log(time)

                date.setDate(date.getDate() - 3);//获取3天前的日期
                var year2 = date.getFullYear();
                var month2 = date.getMonth() + 1;
                var d2 = date .getDate();
                if( month2 <10){
                    month2 = '0' + month2;
                }
                var day2 = date.getDate();
                if( d2 < 10){
                    day2 = '0' + day2;
                }
                var time2 = year2 + "-" + month2 + "-" + day2;
                // console.log(time2)
                //获取3天前的日期
                var starttime  = time2
                var endtime = time
            }else{
                var starttime  = this.value1[0]
                var starttime  = this.value1[0]
                var date = new Date();
                var dd=Number(this.value1[1].slice(8))
                var yy=Number(this.value1[1].slice(5,7))
                // console.log(yy)
                date.setDate(dd + 1)
                var year = date.getFullYear();
                console.log(date.getMonth())
                if(date.getMonth()==1 && yy == 12){
                    var month = date.getMonth(); 
                }else{
                    var month = date.getMonth()+1; 

                }
                var d = date .getDate();
                if( (month) <10){
                    month = '0' + month;
                }
                var day = date.getDate();
                if( d < 10){
                    day = '0' + day;
                }
                var endtime = year + "-" + month + "-" + day;
            }
            const postdata={
                "starttime": starttime,
                "endtime": endtime
            }
            console.log(postdata)
            const url="/findimformationbyshortid"
            
            this.$http.post(url,postdata)
			.then(res => {
                console.log(res)
                this.loading = false
                this.totals=res.data.filelist.length
                this.alldata=res.data.filelist
                this.tableData=this.alldata.slice(this.start,this.end)
            })
            .catch(err => {
                console.error(err);
            })
            
        },
        upload(){
            this.uploadshow=true
        },
        handleClick(row){
            // console.log(row);
            var res={}
            res=row
            res.type ='1'
            console.log(res)
            const url="/export"
            this.$http.post(url,res,{responseType: 'blob'})
			.then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.config.data)
                
                const blob = res.data;
				const reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = (e) => {
				const a = document.createElement('a');
                // const name = (new Date()).getFullYear()+""+((new Date()).getMonth()+1)+""+(new Date()).getDate()+"-"+(new Date()).getHours()+"_"+(new Date()).getMinutes();
                var fname=JSON.parse(res.config.data)
                console.log(fname.filename)
                // a.download = fname.filename;
                // a.download = "可营销"+fname.filename;
                a.download = "可营销"+`.xls`;

				// 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
				a.href = e.target.result;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				};
            })
            .catch(err => {
                console.error(err);
            })
        },
        handleClick2(row){
            // console.log(row);
            var res={}
            res=row
            res.type ='2'
            console.log(res)
            const url="/export"
            this.$http.post(url,res,{responseType: 'blob'})
			.then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.config.data)
                
                const blob = res.data;
				const reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = (e) => {
                    const a = document.createElement('a');
                    // const name = (new Date()).getFullYear()+""+((new Date()).getMonth()+1)+""+(new Date()).getDate()+"-"+(new Date()).getHours()+"_"+(new Date()).getMinutes();
                    var fname=JSON.parse(res.config.data)
                    // a.download = "不可营销"+fname.filename;
                    a.download = "不可营销"+`.xls`;
                    // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
				};
            })
            .catch(err => {
                console.error(err);
            })
        },
        deletClick(row){
            

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var res={}
                res=row
                console.log(res)
                const url="/deleteyqhfile"
                this.$http.post(url,res,)
                .then(res => {
                    console.log(res)
                    if(res.status == '200'){
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                        });
                        this.chaxun()
                    }
                })
                .catch(err => {
                    console.error(err);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        closeupload(){
            this.uploadshow=false
        },
        down(){
            console.log("下载")
        },

        handleSizeChange(){

        },
        handleCurrentChange(){
            this.start=(this.currentPage-1)*this.pagesize
            this.end=this.currentPage*this.pagesize
            this.tableData=this.alldata.slice(this.start,this.end);
        },
        uploagerror(err, file, fileList){
            this.$message.error('上传失败');
            // console.log(err)
            console.log(file)
            console.log(fileList)
        },
        handleAvatarSuccess(res, file) {
            console.log(res)
            console.log(file)
            this.chaxun()
            this.$message({
                message: res.msg,
                type: 'success',
            });
        },
    }
};
</script>


<style scoped>
.search{
    /* width: 100%; */
    background-color: rgb(237, 242, 245);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center; 
    align-content: flex-start;
    padding: 10px 20px;
}
.search>div{
    /* flex-basis: 25%; */
	flex-grow: 1;
}
.el-input .el-input__inner{
    width: 100%;
}
.riqi{
    /* float: left; */
    display: inline;
}
.chaxun{
    padding: 5px 20px;
    background-color: rgb(32, 155, 250);
    box-shadow: 0 0 2px #999;
    color: white;
    border-radius: 50px;
    cursor: pointer;
    margin: 0 10px;
}
.chaxun:hover{
    background-color: rgb(36, 132, 206);
}
.search label{
    /* font-size: 18px; */
    /* font-weight: 550; */
    color: #444;
}
.upload{
    width: 500px;
    max-height: 300px;
    border-radius: 10px;
    box-shadow: 0 0 2px #444;
    padding: 20px;
    text-align: center;
    background-color: rgba(197, 205, 216, 0.918);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1000;
}
/* .el-icon-close{
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 18px;
} */
.closeupload{
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 22px;
    color: #999;
}
.closeupload:hover{
    color: #000;
}
.upload-demo{
    display: block;
    margin: auto;
}
.el-button+.el-button {
    /* margin-left: 0px; */
}
.el-pagination{
    background-color: white;
}
</style>
