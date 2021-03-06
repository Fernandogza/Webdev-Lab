(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*
Copyright 2012 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var $, SimpleDataGrid, SimpleWidget, SortOrder, html_escape, max, min, parseQueryParameters, parseUrl, range, slugify,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimpleWidget = require('./simple.widget');

$ = jQuery;

min = function(value1, value2) {
  if (value1 < value2) {
    return value1;
  } else {
    return value2;
  }
};

max = function(value1, value2) {
  if (value1 > value2) {
    return value1;
  } else {
    return value2;
  }
};

range = function(start, stop) {
  var array, i, len;
  len = stop - start;
  array = new Array(len);
  i = 0;
  while (i < len) {
    array[i] = start;
    start += 1;
    i += 1;
  }
  return array;
};

SimpleDataGrid = (function(superClass) {
  extend(SimpleDataGrid, superClass);

  function SimpleDataGrid() {
    return SimpleDataGrid.__super__.constructor.apply(this, arguments);
  }

  SimpleDataGrid.prototype.defaults = {
    order_by: null,
    url: null,
    data: null,
    paginator: null,
    on_generate_tr: null,
    on_generate_footer: null,
    auto_escape: true,
    keyboard_support: false,
    parameters: {},
    unsorted_columns: null
  };

  SimpleDataGrid.prototype.loadData = function(data) {
    return this._fillGrid(data);
  };

  SimpleDataGrid.prototype.getColumns = function() {
    return this.columns;
  };

  SimpleDataGrid.prototype.getSelectedRow = function() {
    if (this.$selected_row) {
      return this.$selected_row.data('row');
    } else {
      return null;
    }
  };

  SimpleDataGrid.prototype.reload = function() {
    return this._loadData();
  };

  SimpleDataGrid.prototype.setParameter = function(key, value) {
    return this.parameters[key] = value;
  };

  SimpleDataGrid.prototype.setCurrentPage = function(page) {
    return this.current_page = page;
  };

  SimpleDataGrid.prototype.getCurrentPage = function() {
    return this.current_page;
  };

  SimpleDataGrid.prototype.addColumn = function(column, index) {
    var column_info;
    column_info = this._createColumnInfo(column);
    if (index != null) {
      this.columns.splice(index, 0, column_info);
    } else {
      this.columns.push(column_info);
    }
    return column_info;
  };

  SimpleDataGrid.prototype.removeColumn = function(column_key) {
    var column_index, getColumnIndex;
    getColumnIndex = (function(_this) {
      return function() {
        var column, i, j, len1, ref;
        ref = _this.columns;
        for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
          column = ref[i];
          if (column.key === column_key) {
            return i;
          }
        }
        return null;
      };
    })(this);
    column_index = getColumnIndex();
    if (column_index !== null) {
      return this.columns.splice(column_index, 1);
    }
  };

  SimpleDataGrid.prototype.url = function(value) {
    if (value) {
      this._url = value;
    }
    return this._url;
  };

  SimpleDataGrid.prototype.selectRow = function(row_index) {
    var $rows, row_element;
    $rows = this.$tbody.find('tr');
    row_element = $rows[row_index];
    if (row_element) {
      return this._selectRow($(row_element));
    }
  };

  SimpleDataGrid.prototype._init = function() {
    SimpleDataGrid.__super__._init.call(this);
    this._url = this._getBaseUrl();
    this.$selected_row = null;
    this.current_page = 1;
    this.parameters = this.options.parameters;
    this.order_by = this._parseOrderByOption();
    this.sort_order = this._parseSortorderOption() || SortOrder.ASCENDING;
    this._generateColumnData();
    this._createDomElements();
    this._bindEvents();
    return this._loadData();
  };

  SimpleDataGrid.prototype._deinit = function() {
    this._removeDomElements();
    this._removeEvents();
    this.columns = [];
    this.options = {};
    this.parameters = {};
    this.order_by = null;
    this.sort_order = null;
    this.$selected_row = null;
    this.current_page = 1;
    this._url = null;
    return SimpleDataGrid.__super__._deinit.call(this);
  };

  SimpleDataGrid.prototype._getBaseUrl = function() {
    var url;
    url = this.options.url;
    if (url) {
      return url;
    } else {
      return this.$el.data('url');
    }
  };

  SimpleDataGrid.prototype._generateColumnData = function() {
    var addColumn, column_map, generateFromOptions, generateFromThElements;
    column_map = {};
    addColumn = (function(_this) {
      return function(info) {
        _this.columns.push(info);
        return column_map[info.key] = info;
      };
    })(this);
    generateFromThElements = (function(_this) {
      return function() {
        var $th_elements;
        $th_elements = _this.$el.find('th');
        return $th_elements.each(function(i, th) {
          var $th, key, title;
          $th = $(th);
          title = $th.text();
          key = $th.data('key') || slugify(title);
          return addColumn({
            title: title,
            key: key
          });
        });
      };
    })(this);
    generateFromOptions = (function(_this) {
      return function() {
        var column, column_info, j, key, len1, ref;
        ref = _this.options.columns;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          column = ref[j];
          column_info = null;
          if (typeof column === 'object') {
            if ('key' in column) {
              key = column.key;
              if (typeof key === 'string') {
                column_info = column_map[key];
              } else {
                column_info = _this.columns[key];
              }
            }
          }
          if (column_info) {
            _this._updateColumnInfo(column_info, column);
          } else {
            column_info = _this._createColumnInfo(column);
            if (column_info) {
              addColumn(column_info);
            }
          }
        }
        return null;
      };
    })(this);
    this.columns = [];
    generateFromThElements();
    if (this.options.columns) {
      return generateFromOptions();
    }
  };

  SimpleDataGrid.prototype._createColumnInfo = function(column) {
    if (typeof column === 'object') {
      if (!(column.title || column.key)) {
        return null;
      } else {
        return {
          title: column.title,
          key: column.key || slugify(column.title),
          on_generate: column.on_generate
        };
      }
    } else {
      return {
        title: column,
        key: slugify(column)
      };
    }
  };

  SimpleDataGrid.prototype._updateColumnInfo = function(column_info, column) {
    if (column.title) {
      column_info.title = column.title;
    }
    if (column.on_generate) {
      return column_info.on_generate = column.on_generate;
    }
  };

  SimpleDataGrid.prototype._parseOrderByOption = function() {
    var order_by, order_by_from_data, order_by_from_options;
    order_by_from_options = this.options.order_by;
    order_by_from_data = this.$el.data('order-by');
    order_by = !!(order_by_from_options || order_by_from_data);
    if (typeof order_by_from_data === 'string') {
      order_by = order_by_from_data;
    }
    if (typeof order_by_from_options === 'string') {
      order_by = order_by_from_options;
    }
    return order_by;
  };

  SimpleDataGrid.prototype._parseSortorderOption = function() {
    var sortorder, sortorder_from_data, sortorder_from_options;
    sortorder_from_options = this.options.sortorder;
    sortorder_from_data = this.$el.data('sortorder');
    sortorder = sortorder_from_options || sortorder_from_data;
    if (sortorder === 'asc') {
      return SortOrder.ASCENDING;
    } else if (sortorder === 'desc') {
      return SortOrder.DESCENDING;
    } else {
      return false;
    }
  };

  SimpleDataGrid.prototype._createDomElements = function() {
    var initBody, initFoot, initHead, initTable;
    initTable = (function(_this) {
      return function() {
        return _this.$el.addClass('simple-data-grid');
      };
    })(this);
    initBody = (function(_this) {
      return function() {
        _this.$tbody = _this.$el.find('tbody');
        if (_this.$tbody.length) {
          return _this.$tbody.empty();
        } else {
          _this.$tbody = $('<tbody></tbody>');
          return _this.$el.append(_this.$tbody);
        }
      };
    })(this);
    initFoot = (function(_this) {
      return function() {
        _this.$tfoot = _this.$el.find('tfoot');
        if (_this.$tfoot.length) {
          return _this.$tfoot.empty();
        } else {
          _this.$tfoot = $('<tfoot></tfoot>');
          return _this.$el.append(_this.$tfoot);
        }
      };
    })(this);
    initHead = (function(_this) {
      return function() {
        _this.$thead = _this.$el.find('thead');
        if (_this.$thead.length) {
          return _this.$thead.empty();
        } else {
          _this.$thead = $('<thead></thead>');
          return _this.$el.append(_this.$thead);
        }
      };
    })(this);
    initTable();
    initHead();
    initBody();
    return initFoot();
  };

  SimpleDataGrid.prototype._removeDomElements = function() {
    this.$el.removeClass('simple-data-grid');
    if (this.$tbody) {
      this.$tbody.remove();
    }
    return this.$tbody = null;
  };

  SimpleDataGrid.prototype._bindEvents = function() {
    this.$el.delegate('tbody tr', 'click', $.proxy(this._clickRow, this));
    this.$el.delegate('thead .sdg-sorted', 'click', $.proxy(this._clickHeader, this));
    this.$el.delegate('.sdg-pagination a', 'click', $.proxy(this._handleClickPage, this));
    if (this.options.keyboard_support) {
      return $(document).bind('keydown.datagrid', $.proxy(this._handleKeyDown, this));
    }
  };

  SimpleDataGrid.prototype._removeEvents = function() {
    this.$el.undelegate('tbody tr', 'click');
    this.$el.undelegate('tbody thead th a', 'click');
    this.$el.undelegate('.sdg-pagination a', 'click');
    return $(document).unbind('keydown.datagrid', $.proxy(this._handleKeyDown, this));
  };

  SimpleDataGrid.prototype._loadData = function() {
    var getDataFromArray, getDataFromUrl, order_by, query_parameters;
    query_parameters = $.extend({}, this.parameters, {
      page: this.current_page
    });
    order_by = this._getOrderByColumn();
    if (order_by) {
      query_parameters.order_by = order_by;
      if (this.sort_order === SortOrder.DESCENDING) {
        query_parameters.sortorder = 'desc';
      } else {
        query_parameters.sortorder = 'asc';
      }
    }
    getDataFromUrl = (function(_this) {
      return function() {
        _this.$el.addClass('sdg-loading');
        return $.ajax({
          url: _this._url,
          data: query_parameters,
          success: function(response) {
            var result;
            _this.$el.removeClass('sdg-loading');
            if ($.isArray(response) || typeof response === 'object' || (response == null)) {
              result = response;
            } else {
              result = $.parseJSON(response);
            }
            return _this._fillGrid(result);
          },
          cache: false,
          type: 'GET',
          dataType: 'json'
        });
      };
    })(this);
    getDataFromArray = (function(_this) {
      return function() {
        return _this._fillGrid(_this.options.data);
      };
    })(this);
    if (this._url) {
      return getDataFromUrl();
    } else if (this.options.data) {
      return getDataFromArray();
    } else {
      return this._fillGrid([]);
    }
  };

  SimpleDataGrid.prototype._fillGrid = function(data) {
    var addRowFromArray, addRowFromObject, event, fillFooter, fillHeader, fillPaginator, fillRows, generateTr, rows, total_pages;
    addRowFromObject = (function(_this) {
      return function(row, previous_row) {
        var column, html, j, len1, ref, value;
        html = '';
        ref = _this.columns;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          column = ref[j];
          if (column.key in row) {
            value = row[column.key];
            if (_this.options.auto_escape) {
              value = html_escape(value);
            }
            if (column.on_generate) {
              value = column.on_generate(value, row, previous_row);
            }
          } else {
            if (column.on_generate) {
              value = column.on_generate('', row, previous_row);
            } else {
              value = '';
            }
          }
		  if(column.key == "foto"){
			html += "<td class=\"sdg-col_" + column.key + "\"> <img src=\""+ value + "\" style=\"vertical-align:middle;width:100%\"/></td>";
		  }else if(column.key == "liga"){
			html += "<td class=\"sdg-col_" + column.key + "\"><a href=\"evento.html?id="+value+"\">Ver<a/></td>";  
		  }else{
			html += "<td class=\"sdg-col_" + column.key + "\">" + value + "</td>";  
		  }
        }
        return html;
      };
    })(this);
    addRowFromArray = (function(_this) {
      return function(row, previous_row) {
        var column, html, i, j, len1, ref, value;
        html = '';
        ref = _this.columns;
        for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
          column = ref[i];
          if (i < row.length) {
            value = row[i];
          } else {
            value = '';
          }
          if (column.on_generate) {
            value = column.on_generate(value, row, previous_row);
          }
          html += "<td class=\"sdg-col_" + column.key + "\">" + value + "</td>";
        }
        return html;
      };
    })(this);
    generateTr = function(row) {
      var data_string;
      if (row.id) {
        data_string = " data-id=\"" + row.id + "\"";
      } else {
        data_string = "";
      }
      return "<tr" + data_string + ">";
    };
    fillRows = (function(_this) {
      return function(rows) {
        var $tr, html, j, len1, previous_row, row;
        _this.$tbody.empty();
        previous_row = null;
        for (j = 0, len1 = rows.length; j < len1; j++) {
          row = rows[j];
          html = generateTr(row);
          if ($.isArray(row)) {
            html += addRowFromArray(row, previous_row);
          } else {
            html += addRowFromObject(row, previous_row);
          }
          html += '</tr>';
          $tr = $(html);
          $tr.data('row', row);
          if (_this.options.on_generate_tr) {
            _this.options.on_generate_tr($tr, row, previous_row);
          }
          _this.$tbody.append($tr);
          previous_row = row;
        }
        return null;
      };
    })(this);
    fillFooter = (function(_this) {
      return function(total_pages, row_count) {
        var html;
        if (!total_pages || total_pages === 1) {
          if (row_count === 0) {
            html = "<tr><td colspan=\"" + _this.columns.length + "\">No rows</td></tr>";
          } else {
            html = '';
          }
        } else {
          html = "<tr><td class=\"sdg-pagination\" colspan=\"" + _this.columns.length + "\">";
          html += fillPaginator(_this.current_page, total_pages);
          html += "</td></tr>";
        }
        _this.$tfoot.html(html);
        if (_this.options.on_generate_footer) {
          return _this.options.on_generate_footer(_this.$tfoot, _this, data);
        }
      };
    })(this);
    fillPaginator = (function(_this) {
      return function(current_page, total_pages) {
        var html, j, len1, page, pages;
        html = '<ul class="pagination center">';
        pages = _this._getPages(current_page, total_pages);
        if (current_page > 1) {
          html += "<li class=\"waves-effect\"><a href=\"#\" data-page=\"" + (current_page - 1) + "\">&lsaquo;&lsaquo;&nbsp;previous</a></li>";
        } else {
          html += "<li class=\"sdg-disabled\"><a href=\"#\">&lsaquo;&lsaquo;&nbsp;previous</a></li>";
        }
        for (j = 0, len1 = pages.length; j < len1; j++) {
          page = pages[j];
          if (!page) {
            html += '<li><span>...</span></li>';
          } else {
            if (page === current_page) {
              html += "<li class=\"active blue darken-4\"><a>" + page + "</a></li>";
            } else {
              html += "<li class=\"waves-effect\"><a href=\"#\" data-page=\"" + page + "\">" + page + "</a></li>";
            }
          }
        }
        if (current_page < total_pages) {
          html += "<li class=\"waves-effect\"><a href=\"#\" data-page=\"" + (current_page + 1) + "\">next&nbsp;&rsaquo;&rsaquo;</a></li>";
        } else {
          html += "<li class=\"sdg-disabled\"><a>next&nbsp;&rsaquo;&rsaquo;</a></li>";
        }
        html += '</ul>';
        return html;
      };
    })(this);
    fillHeader = (function(_this) {
      return function(row_count) {
        var class_html, classes, column, html, is_sorted, j, len1, order_by, ref, sort_text;
        order_by = _this._getOrderByColumn();
        html = '<tr>';
        ref = _this.columns;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          column = ref[j];
          is_sorted = _this._isColumnSortable(column.key);
          classes = "sdg-col_" + column.key;
          if (is_sorted) {
            classes += " sdg-sorted";
          }
          html += "<th data-key=\"" + column.key + "\" class=\"" + classes + "\">";
          if (!is_sorted) {
            html += column.title;
          } else {
            html += "<a href=\"#\">" + column.title;
            if (column.key === order_by) {
              class_html = "sdg-sort ";
              if (_this.sort_order === SortOrder.DESCENDING) {
                class_html += "sdg-asc";
                sort_text = '&#x25b2;';
              } else {
                class_html += "sdg-desc";
                sort_text = '&#x25bc;';
              }
              html += "<span class=\"" + class_html + "\">" + sort_text + "</span>";
            }
            html += "</a>";
          }
          html += "</th>";
        }
        html += '</tr>';
        return _this.$thead.html(html);
      };
    })(this);
    if ($.isArray(data)) {
      rows = data;
      total_pages = 0;
    } else if (data && data.rows) {
      rows = data.rows;
      total_pages = data.total_pages || 0;
    } else {
      rows = [];
    }
    this.total_pages = total_pages;
    fillRows(rows);
    fillFooter(total_pages, rows.length);
    fillHeader(rows.length);
    event = $.Event('datagrid.load_data');
    return this.$el.trigger(event);
  };

  SimpleDataGrid.prototype._clickRow = function(e) {
    var $tr, event;
    $tr = $(e.target).closest('tr');
    this._selectRow($tr);
    event = $.Event('datagrid.select');
    event.row = $tr.data('row');
    event.$row = $tr;
    return this.$el.trigger(event);
  };

  SimpleDataGrid.prototype._selectRow = function($tr) {
    if (this.$selected_row) {
      this.$selected_row.removeClass('sdg-selected');
    }
    $tr.addClass('sdg-selected');
    return this.$selected_row = $tr;
  };

  SimpleDataGrid.prototype._handleClickPage = function(e) {
    var page;
    page = $(e.target).data('page');
    if (page) {
      this._gotoPage(page);
      return false;
    } else {
      return true;
    }
  };

  SimpleDataGrid.prototype._gotoPage = function(page) {
    if (page <= this.total_pages) {
      this.current_page = page;
      return this._loadData();
    }
  };

  SimpleDataGrid.prototype._clickHeader = function(e) {
    var $th, key;
    $th = $(e.target).closest('th');
    if ($th.length) {
      key = $th.data('key');
      if (key === this._getOrderByColumn()) {
        if (this.sort_order === SortOrder.ASCENDING) {
          this.sort_order = SortOrder.DESCENDING;
        } else {
          this.sort_order = SortOrder.ASCENDING;
        }
      } else {
        this.sort_order = SortOrder.ASCENDING;
      }
      this.order_by = key;
      this.current_page = 1;
      this._loadData();
    }
    return false;
  };

  SimpleDataGrid.prototype._getPages = function(current_page, total_pages) {
    var current_end, current_range, current_start, first_end, first_gap, first_range, last_gap, last_range, last_start, page_window;
    page_window = this._getPageWindow();
    first_end = min(page_window, total_pages);
    last_start = max(1, (total_pages - page_window) + 1);
    current_start = max(1, current_page - page_window);
    current_end = min(total_pages, current_page + page_window);
    if (first_end >= current_start) {
      current_start = 1;
      first_range = [];
    } else {
      first_range = range(1, first_end + 1);
    }
    if (current_end >= last_start) {
      current_end = total_pages;
      last_range = [];
    } else {
      last_range = range(last_start, total_pages + 1);
    }
    current_range = range(current_start, current_end + 1);
    first_gap = current_start - first_end;
    if (first_gap === 2) {
      first_range.push(first_end + 1);
    } else if (first_gap > 2) {
      first_range.push(0);
    }
    last_gap = last_start - current_end;
    if (last_gap === 2) {
      current_range.push(current_end + 1);
    } else if (last_gap > 2) {
      current_range.push(0);
    }
    return first_range.concat(current_range, last_range);
  };

  SimpleDataGrid.prototype.testGetPages = function(current_page, total_pages) {
    return this._getPages(current_page, total_pages);
  };

  SimpleDataGrid.prototype._getPageWindow = function() {
    if (this.options.paginator && this.options.paginator.page_window) {
      return this.options.paginator.page_window;
    } else {
      return 4;
    }
  };

  SimpleDataGrid.prototype._getOrderByColumn = function() {
    if (!this.order_by) {
      return null;
    } else if (this.order_by !== true) {
      return this.order_by;
    } else if (this.columns.length) {
      return this.columns[0].key;
    } else {
      return null;
    }
  };

  SimpleDataGrid.prototype._handleKeyDown = function(e) {
    var DOWN, UP, key;
    UP = 38;
    DOWN = 40;
    if (!this.options.keyboard_support) {
      return;
    }
    if ($(document.activeElement).is('textarea,input')) {
      return true;
    }
    key = e.which;
    switch (key) {
      case DOWN:
        return this._moveDown();
      case UP:
        return this._moveUp();
    }
  };

  SimpleDataGrid.prototype._moveDown = function() {
    var $tr;
    if (!this.$selected_row) {
      this._selectFirstRow();
      return false;
    } else {
      $tr = this.$selected_row.next('tr');
      if ($tr.length) {
        this._selectRow($tr);
        return false;
      } else {
        return true;
      }
    }
  };

  SimpleDataGrid.prototype._moveUp = function() {
    var $tr;
    if (!this.$selected_row) {
      this._selectFirstRow();
      return false;
    } else {
      $tr = this.$selected_row.prev('tr');
      if ($tr.length) {
        this._selectRow($tr);
        return false;
      } else {
        return true;
      }
    }
  };

  SimpleDataGrid.prototype._selectFirstRow = function() {
    var $tr;
    $tr = this.$tbody.find('tr:first-child');
    if ($tr.length) {
      return this._selectRow($tr);
    }
  };

  SimpleDataGrid.prototype._isColumnSortable = function(field_name) {
    if (!this._getOrderByColumn()) {
      return false;
    } else {
      if (this.options.unsorted_columns) {
        return $.inArray(field_name, this.options.unsorted_columns) === -1;
      } else {
        return true;
      }
    }
  };

  return SimpleDataGrid;

})(SimpleWidget);

SimpleWidget.register(SimpleDataGrid, 'simple_datagrid');

slugify = function(string) {
  return string.replace(/[-\s]+/g, '_').replace(/[^a-zA-Z0-9\_]/g, '').toLowerCase();
};

parseQueryParameters = function(query_string) {
  var j, key, keyval, len1, p, parameter_strings, query_parameters, value;
  query_parameters = {};
  parameter_strings = query_string.toString().split(/[&;]/);
  for (j = 0, len1 = parameter_strings.length; j < len1; j++) {
    p = parameter_strings[j];
    if (p !== "") {
      keyval = p.split('=');
      key = keyval[0];
      value = keyval[1].replace('+', ' ');
      query_parameters[key] = value;
    }
  }
  return query_parameters;
};

parseUrl = function(url) {
  var base_url, query_parameters, query_string, url_parts;
  url_parts = url.split('?');
  if (url_parts.length === 1) {
    return [url, {}];
  } else {
    base_url = url_parts[0], query_string = url_parts[1];
    query_parameters = parseQueryParameters(query_string);
    return [base_url, query_parameters];
  }
};

window.SimpleDataGrid = SimpleDataGrid;

SimpleDataGrid.slugify = slugify;

SortOrder = {
  ASCENDING: 1,
  DESCENDING: 2
};

html_escape = function(string) {
  return ('' + string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
};

},{"./simple.widget":2}],2:[function(require,module,exports){

/*
Copyright 2013 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var $, SimpleWidget,
  slice = [].slice;

$ = jQuery;

SimpleWidget = (function() {
  SimpleWidget.prototype.defaults = {};

  function SimpleWidget(el, options) {
    this.$el = $(el);
    this.options = $.extend({}, this.defaults, options);
  }

  SimpleWidget.prototype.destroy = function() {
    return this._deinit();
  };

  SimpleWidget.prototype._init = function() {
    return null;
  };

  SimpleWidget.prototype._deinit = function() {
    return null;
  };

  SimpleWidget.register = function(widget_class, widget_name) {
    var callFunction, createWidget, destroyWidget, getDataKey, getWidgetData;
    getDataKey = function() {
      return "simple_widget_" + widget_name;
    };
    getWidgetData = function(el, data_key) {
      var widget;
      widget = $.data(el, data_key);
      if (widget && (widget instanceof SimpleWidget)) {
        return widget;
      } else {
        return null;
      }
    };
    createWidget = function($el, options) {
      var data_key, el, existing_widget, i, len, widget;
      data_key = getDataKey();
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        existing_widget = getWidgetData(el, data_key);
        if (!existing_widget) {
          widget = new widget_class(el, options);
          if (!$.data(el, data_key)) {
            $.data(el, data_key, widget);
          }
          widget._init();
        }
      }
      return $el;
    };
    destroyWidget = function($el) {
      var data_key, el, i, len, results, widget;
      data_key = getDataKey();
      results = [];
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        widget = getWidgetData(el, data_key);
        if (widget) {
          widget.destroy();
        }
        results.push($.removeData(el, data_key));
      }
      return results;
    };
    callFunction = function($el, function_name, args) {
      var el, i, len, result, widget, widget_function;
      result = null;
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        widget = $.data(el, getDataKey());
        if (widget && (widget instanceof SimpleWidget)) {
          widget_function = widget[function_name];
          if (widget_function && (typeof widget_function === 'function')) {
            result = widget_function.apply(widget, args);
          }
        }
      }
      return result;
    };
    return $.fn[widget_name] = function() {
      var $el, args, argument1, function_name, options;
      argument1 = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      $el = this;
      if (argument1 === void 0 || typeof argument1 === 'object') {
        options = argument1;
        return createWidget($el, options);
      } else if (typeof argument1 === 'string' && argument1[0] !== '_') {
        function_name = argument1;
        if (function_name === 'destroy') {
          return destroyWidget($el);
        } else {
          return callFunction($el, function_name, args);
        }
      }
    };
  };

  return SimpleWidget;

})();

module.exports = SimpleWidget;

},{}]},{},[1]);
