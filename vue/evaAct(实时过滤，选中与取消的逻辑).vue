<template>
  <div>
    <div style="width: 900px;min-height:600px">
      <div>
        <!-- <el-alert title="为确保评价活动的有效性，请确保已设置好参与评价的班级教师和班级学生。" type="warning" style="width: 800px;marginBottom: 20px"></el-alert> -->
        <el-alert title="为确保评价活动的有效性，请确保已设置好参与评价的用户。" type="warning" style="width: 800px;marginBottom: 20px"></el-alert>
      </div>
      <el-form :model="form" style="display: inline-grid;">
        <el-form-item label="活动名称:" label-width="120px" required style="width:800px;float:left;">
          <el-input v-model="data.activityName" maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="活动描述:" label-width="120px" style="width:800px;float:left;">
          <el-input v-model="data.contentDescription" maxlength='300'></el-input>
        </el-form-item>
        <el-form-item label="学年:" label-width="120px" required style="float:left;">
          <el-select v-model="data.termYear" clearable placeholder="请选择" @change="yearChange">
            <el-option v-for="item in yearList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期:" label-width="120px" required style="float:left;">
          <el-select v-model="data.termCode" clearable placeholder="请选择">
            <el-option v-for="item in termList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间:" label-width="120px" required style="float:left;">
          <el-date-picker v-model="data.starttime" type="date" placeholder="选择日期" size='medium' value-format='yyyy-MM-dd'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" label-width="120px" required style="float:left;">
          <el-date-picker v-model="data.endtime" type="date" placeholder="选择日期" size='medium' value-format='yyyy-MM-dd'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动类型:" label-width="120px" required style="float:left;">
          <!-- <el-radio-group v-model="data.activityType">
            <el-radio v-for="templateType in templateTypes" :key="templateType.dicKey" :label="templateType.dicKey">{{templateType.dicValue}}</el-radio>
          </el-radio-group> -->
          {{typeText}}
        </el-form-item>
        <el-form-item label="指标体系:" label-width="120px" :required="type === 1" style="width:100%;float:left;" v-if="type === 1">
          <el-checkbox-group v-model="data.evaluationSystemIds" class="sys_cls">
            <el-checkbox v-for="sys in sysList" :key="sys.id" :value="sys.id" :label="sys.id">{{sys.evaluationSystemName}}
              <i class="el-icon-search" title="预览" @click="viewSystem(sys)" style="cursor:pointer"></i>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="指标模板:" label-width="120px" required style="width:100%;float:left;" v-if="type !== 1 && type !== 2">
          <el-checkbox-group v-model="data.evaluationSystemIds" class="sys_cls">
            <el-checkbox v-for="sys in sysList" :key="sys.id" :value="sys.id" :label="sys.id">{{sys.evaluationSystemName}}
              <i class="el-icon-search" title="预览" @click="viewSystem(sys)" style="cursor:pointer"></i>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="参与人:" label-width="120px" required style="width:100%;float:left;" v-if="type !== 1">
          <el-radio-group v-model="userType">
            <el-radio :label="1">按角色</el-radio>
            <!-- <el-radio :label="2">按班级</el-radio> -->
            <el-radio :label="3">按个人</el-radio>
          </el-radio-group>
          <el-row v-if="userType === 3">
            <el-col :span="2">已选:</el-col>
            <el-col :span="22">
            <el-checkbox-group v-model="data.selectUserIds" class="sys_cls" style="width:642px">
              <el-checkbox v-for="(sys, index) in data.selectUser" :key="index" :label="sys.id" @change="selectUserChange(sys, index)" :title="sys.user.idcard || ''">{{sys.userName}}
              </el-checkbox>
            </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">可选:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="userSelectRole" v-if="type !== 1 && userType === 3">
                <el-radio :label="role" v-for="role in allUserRoles" :key="role.id || role.dicKey">{{role.userName || role.dicValue}}</el-radio>
              </el-radio-group>
              <!-- <br v-if="type !== 1"> -->
              <span v-if="userType === 3" class="filter_cls">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkUserAll" @change="handleCheckAllChangeUser" style="margin: 0px 20px 0px 0px" v-if="userType === 3">全选</el-checkbox>
                <el-input size="small" v-model="userSearchFilter" maxlength='10' placeholder="按用户名搜索">
                  <template slot="prepend">搜索</template></el-input>
              </span>
              <el-checkbox-group v-model="selectUser" class="sys_cls" style="width:642px" @change="handleCheckUserChange">
                <el-checkbox :title="userType === 3 ? sys.user.idcard : ''" v-for="sys in allUserFilter" :key="sys.id || sys.dicKey" :checked="false" :value="sys.userName || sys.dicValue" :label="sys.id || sys.dicKey">{{sys.userName || sys.dicValue}}
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="参选人:" label-width="120px" required style="width:100%;float:left;" v-if="type !== 1 && type !== 3 && type !== 4">
          <el-radio-group v-model="useredType">
            <el-radio :label="1">按角色</el-radio>
            <!-- <el-radio :label="2">按班级</el-radio> -->
            <el-radio :label="3">按个人</el-radio>
          </el-radio-group>
          <el-row v-if="useredType === 3">
            <el-col :span="2">已选:</el-col>
            <el-col :span="22">
            <el-checkbox-group v-model="data.selectedUserIds" class="sys_cls" style="width:642px">
              <el-checkbox :title="sys.user.idcard || ''" v-for="(sys, index) in data.selectedUser" :key="index" :label="sys.id" @change="selectedUserChange(sys, index)">{{sys.userName}}
              </el-checkbox>
            </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">可选:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="useredSelectRole" v-if="useredType === 3">
                <el-radio :label="role" v-for="role in allUserRoles" :key="role.id || role.dicKey">{{role.userName || role.dicValue}}</el-radio>
              </el-radio-group>
              <!-- <br v-if="type !== 1"> -->
              <span v-if="useredType === 3" class="filter_cls">
                <el-checkbox :indeterminate="isIndeterminated" v-model="checkUseredAll" @change="handleCheckAllChangeUsered" style="margin: 0px 20px 0px 0px">全选</el-checkbox>
                <el-input size="small" v-model="useredSearchFilter" maxlength='10' placeholder="按用户名搜索">
                  <template slot="prepend">搜索</template></el-input>
              </span>
              <el-checkbox-group v-model="selectedUser" class="sys_cls" style="width:642px" @change="handleCheckUseredChange">
                <el-checkbox :title="userType === 3 ? sys.user.idcard : ''" v-for="sys in allUseredFilter" :key="sys.id || sys.dicKey" :checked="false" :value="sys.userName || sys.dicValue" :label="sys.id || sys.dicKey">{{sys.userName || sys.dicValue}}
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="有效票数:" label-width="120px" required style="width:800px;float:left;" v-if="type == 2">
          <el-input-number v-model="data.voteNum" :min="1" maxlength='300'></el-input-number>
        </el-form-item>
        <el-form-item label="是否自投/评:" label-width="120px" style="width:800px;float:left;" v-if="type !== 1 && type !== 3">
          <el-switch v-model="data.self" active-color="#13ce66" inactive-color="#d3d3d3"></el-switch>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="sysBoxShow" title="评价体系详情" width="1000px" :modal-append-to-body='false' :modal="false">
        <evaSystem :data="sysData" v-if="sysBoxShow"></evaSystem>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import evaSystem from '../components/evaSystem'
import { getSysList } from '@/api/evaluation/evaluationAdmin'
import { getEvaType } from '@/api/evaluation/evaluationTemplate'
import { getSchoolYear, getSchoolTerm } from '@/api/moral'
import { memberList } from '@/api/baseInfo/organization/structure'
export default {
  data() {
    return {
      form: {},
      yearList: [],
      termList: [],
      sysList: [],
      sysData: {},
      sysBoxShow: false,
      templateTypes: [],
      selectedUser: [],
      selectUser: [],
      allUser: [],
      allUsered: [],
      allUserFilter: [],
      allUseredFilter: [],
      allUserRoles: [], // 角色，需查询
      userType: 1,
      useredType: 1,
      useredSelectRole: 1,
      userSelectRole: 1,
      isIndeterminate: false,
      isIndeterminated: false,
      checkUserAll: false,
      checkUseredAll: false,
      useredSearchFilter: '',
      userSearchFilter: ''
    }
  },
  props: {
    data: Object,
    type: [String, Number],
    typeText: String
  },
  components: {
    evaSystem
  },
  watch: {
    userType: {
      handler(val, old) {
        this.userSearchFilter = ''
        if (val === 1) {
          this.allUserFilter = this.allUserRoles
        } else {
          this.allUserFilter = this.allUser.length > 0 ? this.allUser : this.getUsers(this.userSelectRole, 'user')
        }
      }
    },
    useredType: {
      handler(val, old) {
        this.useredSearchFilter = ''
        if (val === 1) {
          this.allUseredFilter = this.allUserRoles
        } else {
          this.allUseredFilter = this.allUsered.length > 0 ? this.allUsered : this.getUsers(this.useredSelectRole, 'usered')
        }
      }
    },
    userSelectRole: {
      handler(val, old) {
        this.getUsers(val, 'user')
      }
    },
    useredSelectRole: {
      handler(val, old) {
        this.getUsers(val, 'usered')
      }
    },
    userSearchFilter: {
      handler(val, old) {
        this.userSearchChange(val)
      }
    },
    useredSearchFilter: {
      handler(val, old) {
        this.useredSearchChange(val)
      }
    }
  },
  methods: {
    // 接口查不出，暂时改用
    getUsers(val, flag) {
      // afterRoleList({ roleId: val, objectId: this.$store.state.school.schoolId }).then(res => {
      memberList({}).then(res => {
        if (res.data.code === '0') {
          if (flag === 'user') {
            this.userSearchFilter = ''
            // 过滤掉已选的
            this.allUserFilter = this.allUser = JSON.parse(JSON.stringify(res.data.data.filter(e => { return this.data.selectUserIds.indexOf(e.id) < 0 })))
          } else {
            this.useredSearchFilter = ''
            this.allUseredFilter = this.allUsered = JSON.parse(JSON.stringify(res.data.data.filter(e => { return this.data.selectedUserIds.indexOf(e.id) < 0 })))
          }
        }
      })
    },
    selectUserChange(value, index) {
      this.data.selectUser.splice(index, 1)
      // this.data.selectUserIds.splice(index, 1)
      this.allUserFilter = this.allUser.filter(e => {
        return e.userName.toLowerCase().indexOf(this.userSearchFilter.trim().toLowerCase()) > -1 && this.data.selectUserIds.indexOf(e.id) < 0
      })
      this.selectUser = []
    },
    selectedUserChange(value, index) {
      this.data.selectedUser.splice(index, 1)
      this.allUseredFilter = this.allUser.filter(e => {
        return e.userName.toLowerCase().indexOf(this.useredSearchFilter.trim().toLowerCase()) > -1 && this.data.selectedUserIds.indexOf(e.id) < 0
      })
      this.selectedUser = []
    },
    userSearchChange(val) {
      this.allUserFilter = this.allUser.filter(e => {
        return e.userName.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 && this.data.selectUserIds.indexOf(e.id) < 0
      })
    },
    useredSearchChange(val) {
      this.allUseredFilter = this.allUser.filter(e => {
        return e.userName.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 && this.data.selectedUserIds.indexOf(e.id) < 0
      })
    },
    handleCheckUserChange(value) {
      this.checkUserAll = value.length === this.allUser.length && this.allUser.length > 0
      this.isIndeterminate = value.length > 0 && value.length < this.allUser.length
      const changedUser = this.allUserFilter.filter(e => {
        return value.indexOf(e.id) > -1 && this.data.selectUserIds.indexOf(e.id) < 0
      })
      this.allUserFilter = this.allUserFilter.filter(e => {
        return value.indexOf(e.id) < 0
      })
      this.data.selectUser = this.data.selectUser.concat(changedUser)
      this.data.selectUserIds = []
      this.data.selectUser.forEach(e => {
        if (this.data.selectUserIds.indexOf(e.id) < 0) {
          this.data.selectUserIds.push(e.id)
        }
      })
    },
    handleCheckAllChangeUser(val) {
      // 人员
      // this.selectUser = val ? this.allUser : []
      // this.isIndeterminate = false
      if (!val) return
      this.data.selectUser = this.data.selectUser.concat(this.allUserFilter)
      this.data.selectUserIds = []
      this.data.selectUser.forEach(e => {
        if (this.data.selectUserIds.indexOf(e.id) < 0) {
          this.data.selectUserIds.push(e.id)
        }
      })
      this.allUserFilter = []
    },
    handleCheckUseredChange(value) {
      this.checkUseredAll = value.length === this.allUsered.length && this.allUsered.length > 0
      this.isIndeterminated = value.length > 0 && value.length < this.allUsered.length
      const changedUser = this.allUseredFilter.filter(e => {
        return value.indexOf(e.id) > -1 && this.data.selectedUserIds.indexOf(e.id) < 0
      })
      this.allUseredFilter = this.allUseredFilter.filter(e => {
        return value.indexOf(e.id) < 0
      })
      this.data.selectedUser = this.data.selectedUser.concat(changedUser)
      this.data.selectedUserIds = []
      this.data.selectedUser.forEach(e => {
        if (this.data.selectedUserIds.indexOf(e.id) < 0) {
          this.data.selectedUserIds.push(e.id)
        }
      })
    },
    handleCheckAllChangeUsered(val) {
      // 人员
      this.selectUsered = val ? this.allUsered : []
      this.isIndeterminated = false
    },
    viewSystem(row) {
      this.sysData = {
        systemName: row.evaluationSystemName,
        systemDescription: row.systemDescription,
        templateName: row.templateName,
        typeName: row.evaluationTypeName,
        templateData: row.evaluationTemplateContents
      }
      this.sysBoxShow = true
    },
    yearChange() {
      this.data.termCode = ''
      if (this.data.termYear) {
        getSchoolTerm(this.data.termYear).then((res) => {
          if (res.data.code === '0') {
            this.termList = []
            res.data.data.forEach(item => {
              this.termList.push({ value: item.id, label: item.termName })
            })
          }
        })
      } else {
        this.termList = []
      }
    }
  },
  mounted() {
    getSysList(this.$store.state.school.schoolId).then((res) => {
      if (res.data.code === 200) {
        this.sysList = []
        res.data.data.forEach(item => {
          this.sysList.push({
            id: item.evaluationSystem.id,
            evaluationSystemName: item.evaluationSystem.evaluationSystemName,
            systemDescription: item.evaluationSystem.systemDescription,
            templateName: item.evaluationTemplate.templateName,
            evaluationTypeName: item.evaluationType ? item.evaluationType.evaluationTypeName : '',
            evaluationTemplateContents: item.evaluationTemplate.evaluationTemplateContents
          })
        })
      }
    })
    getSchoolYear(this.$store.state.school.schoolId).then((res) => {
      if (res.data.code === '0') {
        this.yearList = []
        res.data.data.forEach(item => {
          this.yearList.push({ value: item.id, label: item.schoolYear })
        })
      }
    })
    getEvaType({
      'dicGroup': 'template_type'
    }).then((res) => {
      if (res.data.code === '0') {
        this.templateTypes = res.data.data
      }
    })
    if (this.data.termYear) {
      getSchoolTerm(this.data.termYear).then((res) => {
        if (res.data.code === '0') {
          this.termList = []
          res.data.data.forEach(item => {
            this.termList.push({ value: item.id, label: item.termName })
          })
        }
      })
    }
    // 需查询用户场景，先假定条件
    if (this.type !== 1) {
      getEvaType({
        'dicGroup': 'user_type',
        'parentId': '2'
      }).then((res) => {
        if (res.data.code === '0') {
          this.allUserFilter = this.allUseredFilter = this.allUserRoles = JSON.parse(JSON.stringify(res.data.data))
        }
      })
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
.form_row_left {
    min-width: 60px;
    padding: 10px;
}
.form_row_right {
    min-width: 600px;
}
.over_class {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sys_cls {
    width: 700px;
    max-height: 150px;
    min-height: 36px;
    overflow-y: auto;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
}
.el-checkbox {
  margin-left: 30px
}
.el-form-item {
  margin-bottom: 12px;
}
.filter_cls {
  display: flex;
  width: 50%;
}
</style>
