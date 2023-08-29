<template>
  <div>
    <div>
      <!-- Header -->
      <div v-if="enableHeader" class="mb-2">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div v-show="searchBox" class="shadow flex md:mr-44" :class="searchBoxClass">
              <input
                v-model="search_keyword"
                v-on:input="onSearch"
                class="w-full rounded p-2"
                type="text"
                placeholder="Search..."
              />
              <button @click="onSearch()" class="bg-white w-auto px-2 flex justify-end items-center">
                <img class="search-icon" src="@/assets/search_primary.svg" />
              </button>
            </div>
          </div>
          <slot name="custom-component" />
          
          <div v-show="isAddNew || isImportData" class="text-right mx-2">
            <button v-show="isImportData" @click="onImportBtnClicked()" class="ml-2 btn-primary rounded px-2 py-1.5 text-md inline">
              {{ importBtnText }}
            </button>

            <button v-show="isAddNew" @click="onAddBtnClicked()" class="ml-2 btn-primary rounded px-2 py-1.5 text-md">
              {{ addBtnText }}
            </button>
          </div>
        </div>
      </div>
      <!-- Table -->
      <div class="table-fix-head border-b border-gray-200 shadow bg-white">
        <table id="custom-data-table" class="divide-y divide-gray-300 w-full" :class="tableExtStyle">
          <thead class="bg-gray-50">
            <tr class="text-left">
              <th class="px-2 py-3 bg-gray-500 z-1" :class="column.colHeadStyle ? column.colHeadStyle : ''" v-for="column in columns" :key="`columns-${column.name}`">
                <a class="text-xs text-gray-500 flex" href="#" v-if="column.sortable" @click.prevent="sort(this.sorted_order, column.attribute, column.dataType)">
                  <span>{{ column.name }}</span>
                  <span>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                </a>
                <span :id="column.name == 'Action' ? 'datatable-th-action' : ''" v-else class="text-xs text-gray-500">
                  {{ column.name }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr :class="highlightRow && !resource.is_viewed ? 'bg-highlight-row' : isOrders && resource.order_status =='rejected' ? 'text-red-500' : ''" v-for="(resource, index) in paginatedData" :key="resource.id" class="text-gray-500">
              <td class="px-2 py-3 text-sm" v-for="column in columns" :key="`cell-${resource.id}-${column.name}`">
                <slot class="text-sm" name="cell" v-bind="{ column, resource }">
                  <span v-if="column.attribute == '#'">
                    {{ getIndex(index) }}
                  </span>
                  <span v-else-if="column.attribute == 'is_active' && column.displayText == true">
                    <div>
                        <span class="text-sm" v-if="resource[column.attribute]">Active</span>
                        <span class="text-sm" v-else>Inactive</span>
                    </div>
                  </span>
                  <span v-else-if="column.type == 'custom_toggle'">
                    <label class="switch cursor-pointer">
                      <input type="checkbox" @click='column.clickEvent($event, resource.id, resource)' v-model="resource[column.attribute]">
                      <span class="slider round"></span>
                    </label>
                  </span>
                  <span v-else-if="column.attribute == 'is_active' || column.display == 'icon'">
                    <div v-if="quickAction">
                      <label class="switch cursor-pointer">
                        <input type="checkbox" @click='onQuickActionPerformed($event, resource.id, resource)' v-model="resource[column.attribute]">
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div v-else>
                        <span class="text-xs rounded-md text-white text-bg-green px-3 py-1" v-if="resource[column.attribute]">ACTIVE</span>
                        <span class="text-xs rounded-md text-white bg-red-600 px-3 py-1" v-else>INACTIVE</span>
                    </div>
                  </span>
                  <span v-else-if="column.attribute == 'is_valid'">
                    <div>
                        <span class="text-xs rounded-md text-white text-bg-green px-3 py-1" v-if="resource[column.attribute]">VALID</span>
                        <span class="text-xs rounded-md text-white bg-red-600 px-3 py-1" v-else>INVALID</span>
                    </div>
                  </span>
                  <span id="data-table-action-buttons" v-else-if="column.attribute == 'action'" class="flex" :class="hasActionButtonLayoutStyle ? actionButtonLayoutStyle : ''">
                    <div v-show="hasCustomAction">
                      <span @click="onCustomActionClicked(resource.id, resource)" class="px-1 py-2 text-sm bg-primary text-white rounded cursor-pointer" :class="resource.style">{{ customActionBtnText }}</span>
                    </div>
                    <a v-show="view" class="inline-block cursor-pointer" @click='onView(resource.id, resource)'>
                        <tw-icon name="heroicons-outline:eye" class="w-6 h-6 color-primary"/>
                    </a>
                    <a v-show="edit" class="inline-block pl-2 cursor-pointer" @click='onEdit(resource.id, resource)'>
                        <tw-icon name="heroicons-outline:pencil-alt" class="w-6 h-6 text-blue-400"/>
                    </a>
                    <a v-show="del" class="inline-block pl-2 cursor-pointer" :class="resource.style" @click='onDeleteIconClicked(resource)'>
                      <tw-icon name="heroicons-outline:trash" class="w-6 h-6" :class="resource.del_icon_style ?? 'text-red-400'"/>
                    </a>
                    <a v-show="!hasCustomAction && !view && !edit && !del" class="inline-block pl-2">
                      —
                    </a>
                  </span>
                  <span v-else-if="column.field == 'image'">
                    <img class="w-8 h-8 rounded" :src="resource[column.attribute]"/>
                  </span>
                  <span v-else-if="column.attribute == 'created_at' || column.formatDate">
                    {{ formatDate(resource[column.attribute], column.dateFormat) }}
                  </span>
                  <span v-else-if="column.nestedObject">
                    <span v-if="column.removeUnderscore"><span v-if="column.isPrice">{{ column.prefix }} {{ removeUnderscore(resource[column?.nestedObject][column?.attribute])?.toFixed(3) }}</span><span v-else>{{ column.prefix }} {{ removeUnderscore(resource[column?.nestedObject][column?.attribute]) }}</span></span> <span v-else><span v-if="column.isPrice">{{ column.prefix }} {{ resource[column?.nestedObject][column?.attribute]?.toFixed(3) }}</span><span v-else>{{ column.prefix }} {{ resource[column?.nestedObject][column?.attribute] }}</span></span>
                  </span>
                  <span v-else-if="column.nestedArrayObject" class="">
                    <span v-if="column.removeUnderscore">
                      <span v-if="column.isPrice">{{ column.prefix }} {{ removeUnderscore(resource[column?.nestedArrayObject][0][column?.attribute])?.toFixed(3) }}</span>
                      <span v-else><pre class="font-tajwal" v-html="removeUnderscore(getCommaSeparatedValuesFromArray(resource[column?.nestedArrayObject], [column?.attribute]))"></pre></span>
                    </span>
                    <span v-else>
                      <span v-if="column.isPrice">{{ column.prefix }} {{ resource[column?.nestedArrayObject][0][column?.attribute]?.toFixed(3) }}</span>
                      <span v-else><pre class="font-tajwal" v-html="getCommaSeparatedValuesFromArray(resource[column?.nestedArrayObject], [column?.attribute])"></pre></span>
                    </span>
                  </span>
                  <span v-else :class="column.extStyle">
                    <span v-if="column.removeUnderscore"><span v-if="column.isPrice">{{ column.prefix }} {{ resource[column.attribute]?.toFixed(3) }}</span><span v-else>{{ column.prefix }} {{ removeUnderscore(resource[column.attribute]) }}</span></span> <span v-else><span v-if="column.isPrice">{{ column.prefix }} {{ resource[column.attribute]?.toFixed(3) }}</span><span v-else>{{ column.prefix }} {{ resource[column.attribute] }}</span></span>
                  </span>
                </slot>
              </td>
            </tr>
            <tr v-if="colTotalObj">
              <td class="px-2 py-3 text-sm" v-for="column in columns" :key="column">
                <span v-if="column.displaySum">{{ colTotalObj[column.totalField] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Custom Component below the table -->
      <div class="mt-2 flex mx-2">
        <slot name="custom-component-2" />
      </div>

        <!-- Footer -->
        <div id="dataTableFooter" class="mt-5 mx-2">
            <div v-if="!serverSidePagination" class="flex items-center pb-8">
                <span class="mr-3 text-md">Showing:</span>
                <form @submit.prevent>
                    <select class="mt-1  py-1.5 pr-1 border rounded" v-model="page_size" @change="onChange($event)">
                        <option v-for="perPageOption in per_page_options" :key="`per-page-options-${perPageOption}`" :value="perPageOption">
                            {{ perPageOption }}
                        </option>
                    </select>
                </form>
                <VueTailwindPagination
                    class="ml-auto flex h-12"
                    :current="current"
                    :total="rows_data.length"
                    :per-page="page_size"
                    @page-changed="current = $event"/>

            </div>
            <div v-else class="flex items-center pb-8">
              <span class="mr-3 text-md">Showing:</span>
              <form @submit.prevent>
                  <select class="mt-1 py-1.5 pr-1.5 border rounded" v-model="default_page_size" @change="onPerPageOptionChange($event, search_keyword, data_sort_order, data_sort_by)">
                      <option v-for="perPageOption in per_page_options" :key="`per-page-options-${perPageOption}`" :value="perPageOption">
                          {{ perPageOption }}
                      </option>
                  </select>
              </form>

              <VueTailwindPagination
                class="ml-auto flex h-12"
                :current="pagination_data?.current_page"
                :total="pagination_data?.total"
                :per-page="pagination_data?.per_page"
                @page-changed="onPageNumberChanged($event)"/>

            </div>
        </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import '@ocrv/vue-tailwind-pagination/styles';
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination';

export default {
  props: {
    enableHeader: Boolean,
    searchBox: Boolean,
    searchFields: Array,
    isAddNew: Boolean,
    addBtnText: String,
    onAddBtnClicked: Function,
    isImportData: Boolean,
    importBtnText: String,
    onImportBtnClicked: Function,
    columns: Array,
    rows: Array,
    onView: Function,
    onEdit: Function,
    onDelete: Function,
    onQuickActionPerformed: Function,
    view: Boolean,
    edit: Boolean,
    del: Boolean,
    quickAction: Boolean,
    searchInNestedObject: Boolean,
    nestedObjNames: Array,
    tableExtStyle: String,
    customPageSize: Number,
    highlightRow: Boolean,
    isOrders: Boolean,
    hasCustomAction: Boolean,
    onCustomActionClicked: Function,
    customActionBtnText: String,
    hasActionButtonLayoutStyle: Boolean,
    actionButtonLayoutStyle: String,
    serverSidePagination: Boolean,
    apiResponse: Array,
    onPageChanged: Function,
    onPerPageOptionChange: Function,
    onSearchData: Function,
    onSortData: Function,
    customToggleCallBack: Function,
    colTotalObj: Array,
    searchBoxClass: String
  },
  components: {
    VueTailwindPagination
  },
  data(){
    return {
      per_page_options: [5,10, 25, 50, 75, 100],
      total_pages: 1,
      current: 1,
      page_size: this.customPageSize ? this.customPageSize : 10,
      sorted_order: "asc",
      is_disabled: true,
      onChange(e) {
        this.current = 1;
        this.page_size = e.target.value;
      },
      rows_data: [],
      actual_data: [],
      search_keyword: "",
      search_results: [],
      default_page_size: 10,
      data_sort_by: '',
      data_sort_order: '',
      current_page: 1
    }
  },
  computed: {
    indexStart() {
      return (this.current - 1) * this.page_size;
    },
    indexEnd() {
      return this.indexStart + Number(this.page_size);
    },
    paginatedData() {
      if(this.serverSidePagination) {
        return this.actual_data
      }
      return this.rows_data.slice(this.indexStart, this.indexEnd);
    },
    pageNumbers() {
      let num = this.rows_data.length/this.page_size;
      if(!this.isInteger(num)){
        this.total_pages = num + 1;
        this.total_pages = Math.floor(this.total_pages);
      } else {
        this.total_pages =  num;
      }
      return this.total_pages;
    },
  },
  methods: {
    getIndex(index) {
      if(!this.serverSidePagination) {
        if(this.current <= 1) {
          return index + 1;
        } else {
          return this.page_size * (this.current - 1) + index + 1;
        }
      } else {
        if(this.pagination_data?.current_page <= 1) {
          return Number(index) + 1
        } else {
          return Number(this.pagination_data?.per_page) * (Number(this.pagination_data?.current_page) - 1) + index + 1
        }
      }
    },
    selectedPage(page){
      this.current = page;
    },
    isInteger(x) { return typeof x === "number" && isFinite(x) && Math.floor(x) === x; },
    sort(sorting_order, sort_by, data_type) {
      if(!this.serverSidePagination) {
        let sorted_data;
        if(sorting_order == 'desc') {
          this.sorted_order = "asc";
          if (data_type == 'string') {
            sorted_data =  _.orderBy(this.actual_data, [data => data[sort_by].toLowerCase()], ["asc"]);
          } else if (data_type == 'int') {
            sorted_data =  _.orderBy(this.actual_data, [data => data[sort_by]], ["asc"]);
          }
        } else {
          this.sorted_order = "desc";
          if (data_type == 'string') {
            sorted_data =  _.orderBy(this.actual_data, [data => data[sort_by].toLowerCase()], ["desc"]);
          } else if (data_type == 'int') {
            sorted_data =  _.orderBy(this.actual_data, [data => data[sort_by]], ["desc"]);
          }
        }
        this.rows_data = JSON.parse(JSON.stringify(sorted_data));
      } else {
        if(sorting_order == 'desc') this.sorted_order = "asc"
        else this.sorted_order = "desc";
        this.data_sort_by = sort_by
        this.data_sort_order = this.sorted_order == "asc" ? "ASC" : "DESC"
        this.onSortData(this.default_page_size, this.search_keyword, this.data_sort_order, sort_by)
      }
    },
    formatDate(value, format) {
      if (value) {
        if(format == 'NONE') {
          return value;
        } else if(format) {
          return moment(String(value)).format(format)
        } else {
          return moment(String(value)).format('DD/MM/YYYY')
        }
      }
      return value;
    },
    removeUnderscore(str){
      return str ? str.replace(/_/g, " ") : str;
    },
    onSearch() {
      if(!this.serverSidePagination) {
        if(this.search_keyword && this.searchFields && this.searchFields.length) {
          this.current = 1;
          this.search_results = [];
          let search_data = this.actual_data;
          if(this.searchInNestedObject) {
            search_data = this.unwrapNestedObject();
          }
          search_data.forEach(actual_data_obj => {
            this.searchFields.forEach(search_field => {
              if(String(actual_data_obj[search_field]).toLowerCase().includes(String(this.search_keyword).toLowerCase())) {
                this.search_results.push(actual_data_obj);
              }
            });
          });

          this.rows_data = [];
          this.rows_data = this.removeDuplicateObjectes(this.search_results);
        } else {
          this.rows_data = this.actual_data;
        }
      } else {
        this.onSearchData(this.default_page_size, this.search_keyword)
      }
    },
    removeDuplicateObjectes(results_array) {
      let temp = [];
      temp = Object.values(results_array.reduce((r, o) => {
        r[o.id] = r[o.id] || o;
        return r;
        },{}));
      return temp;
    },
    unwrapNestedObject() {
      let results_array = this.actual_data;
      for(let i=0; i<results_array.length; i++) {
        for(let j=0; j<this.nestedObjNames.length; j++) {
          let nested_obj_name = this.nestedObjNames[j];
          let nested_object_keys = Object.keys(results_array[i]?.[nested_obj_name]);
          let nested_obj = results_array[i]?.[nested_obj_name];
          for(let k=0; k<nested_object_keys.length; k++) {
            let new_key = nested_obj_name.concat('_').concat(nested_object_keys[k]);
            results_array[i][new_key] = nested_obj[nested_object_keys[k]];
          }
        }
      }
      return results_array;
    },
    getCommaSeparatedValuesFromArray(array_data, key) {
      let comma_separated_str = array_data.reduce(function(p, c) {
        return p ? p + ', <br/>' + c[key] : c[key]
      },'');

      return comma_separated_str
    },
    onDeleteIconClicked(resource) {
      if(this.serverSidePagination) {
        this.onDelete(resource.id, this.current_page, this.default_page_size, this.search_keyword, this.data_sort_order, this.data_sort_by)
      } else {
        this.onDelete(resource.id)
      }
    },
    onPageNumberChanged(event) {
      this.current_page = event
      this.onPageChanged(event, this.default_page_size, this.search_keyword, this.data_sort_order, this.data_sort_by)
    }
  },
  watch: {
    rows() {
      let new_data = JSON.parse(JSON.stringify(this.rows));
      this.actual_data = new_data;
      this.rows_data = new_data;
      this.current = 1;
    },
    apiResponse() {
      this.pagination_data = this.apiResponse
      this.default_page_size = this.pagination_data.per_page
    }
  },
  mounted() {
    this.actual_data = JSON.parse(JSON.stringify(this.rows));
    this.rows_data = JSON.parse(JSON.stringify(this.rows));
  },
};
</script>

<style scoped>
.Page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 22px;
  height: 22px;
  margin: 0 2px;
  color: #666666;
  background-color: transparent;
  font-size: 14px;
  border-radius: 3px;
  box-sizing: border-box;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
  user-select: none; 
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>