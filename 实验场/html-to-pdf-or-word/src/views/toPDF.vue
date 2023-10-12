<!-- 使用html2Canvas、JsPDF实现界面截图导出PDF -->
<template>
  <div class="report-detail" id="pdfDom">
    <div class="content">
      <div class="right-down">
        <el-button size="mini" @click="getPdf('#pdfDom', '玛丽有只小羊羔')" plain :loading="downloadStatus">{{ downloadStatus ? "下载中" : "下载" }}</el-button>
      </div>
      <div class="container">
        <div class="detail">
          <div ref="canvas" class="canvas">
            <p class="title">玛丽有只小羊羔的简介</p>
            <p class="report-time">（2022年5月）</p>
            <section class="paragraph">
              <p class="name">正文</p>
              <p class="paragraph-detail">使用html2Canvas、JsPDF实现界面截图导出PDF 的 小小demo</p>
            </section>
            <section class="paragraph">
              <p class="paragraph-detail"></p>
            </section>
            <section class="paragraph">
              <p class="name">初衷</p>
              <p class="paragraph-detail">
                以梦为马，莫负韶华。是个程序媛、程序媛、程序媛。有问题问我的话，请叫我小姐姐。哈哈...<br />
                总结前端相关知识，希望自己进步的同时，也能帮助到其他人。
              </p>
            </section>
            <section class="paragraph">
              <p class="name">定个小目标，并且去完成它。</p>
              <p class="paragraph-detail">让别人少走弯路。会持续输出有价值并易懂的好文。</p>
              <div class="table-wrap">
                <table class="table">
                  <thead>
                    <th>月份</th>
                    <th>粉丝数</th>
                    <th>点赞数</th>
                    <th>评论数</th>
                    <th>转发数</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1月</td>
                      <td>狂涨</td>
                      <td>飙升</td>
                      <td>居高</td>
                      <td>TOP1</td>
                    </tr>
                    <tr>
                      <td>2月</td>
                      <td>狂涨</td>
                      <td>飙升</td>
                      <td>居高</td>
                      <td>TOP1</td>
                    </tr>
                    <tr>
                      <td>3月</td>
                      <td>狂涨</td>
                      <td>飙升</td>
                      <td>居高</td>
                      <td>TOP1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="500px" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
            <section class="paragraph">
              <div class="chart-wrap" id="chart1">
                <v-chart width="60vw" height="300px" :options="areaDetailData" ref="chart1"></v-chart>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import Echarts from "../components/ECharts.vue";
import "echarts/lib/chart/bar";
export default {
  data() {
    return {
      downloadStatus: false,
      areaDetailData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          bottom: 0,
          textStyle: {
            color: "#fff"
          },
          itemGap: 30
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "12%",
          containLabel: true
        },
        color: ["#5EDCE5", "#87E671"],
        xAxis: {
          type: "category",
          data: ["哈哈1", "哈哈2", "哈哈3"],
          axisPointer: {
            type: "shadow"
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          nameTextStyle: {
            color: "#4BB6FF"
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "本月",
            type: "bar",
            data: [182, 234, 290]
          },
          {
            name: "上月",
            type: "bar",
            data: [193, 234, 310]
          }
        ]
      }
    };
  },
  components: {
    "v-chart": Echarts
  },
  created() {},
  mounted() {},
  methods: {
    // 下载
    getPdf(eles, str) {
      this.downloadStatus = true;
      const title = str;
      const ele = document.querySelector(eles);
      console.log("ele11", ele);
      html2Canvas(ele, {
        allowTaint: true
      }).then((canvas) => {
        const PDF = new JsPDF("p", "mm", "a4"); // A4纸，纵向
        const ctx = canvas.getContext("2d");
        const a4w = 210;
        const a4h = 297; // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
        // eslint-disable-next-line no-mixed-operators
        const imgHeight = Math.floor((a4h * canvas.width) / a4w); // 按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0;

        while (renderedHeight < canvas.height) {
          const page = document.createElement("canvas");
          page.width = canvas.width;
          page.height = Math.min(imgHeight, canvas.height - renderedHeight); // 可能内容不足一页
          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
          // 添加图像到页面，保留10mm边距
          // eslint-disable-next-line no-mixed-operators
          PDF.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, a4w, Math.min(a4h, (a4w * page.height) / page.width));

          renderedHeight += imgHeight;
          if (renderedHeight < canvas.height) {
            PDF.addPage();
          } // 如果后面还有内容，添加一个空页
        }
        this.downloadStatus = false;
        PDF.save(`${title}.pdf`);
      });
    }
  }
};
</script>

<style lang="scss">
.report-detail {
  background: #0e3166;
  position: relative;
  width: 100%;
  height: 100%;
}
.chart-wrap {
  padding-bottom: 40px;
  text-align: center;
}
.content {
  padding: 0px 50px;
  .right-down {
    text-align: right;
    padding-top: 20px;
    .el-button {
      width: 100px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      background: #00bdcd;
      cursor: pointer;
    }
  }
  .container {
    width: 100%;
    height: 100%;
    // background: url("../../assets/visualization/detail-bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    background: #0e3166;
    .close {
      position: absolute;
      top: 10px;
      right: 36px;
      color: #fff;
      font-size: 36px;
      cursor: pointer;
      z-index: 2;
    }
    .detail {
      overflow-y: auto;
      width: 100%;
      height: 100%;
      color: #fff;
      .title {
        text-align: center;
        font-size: 22px;
        padding-top: 30px;
        font-weight: bold;
        color: #0efeff;
      }
      .report-time {
        text-align: center;
        font-size: 16px;
        padding: 12px 0 25px;
        color: #0efeff;
      }
      .paragraph {
        padding-bottom: 15px;
        p {
          padding-top: 5px;
          font-size: 14px;
          line-height: 30px;
          text-align: justify;
        }
        .name {
          font-size: 16px;
          font-weight: bold;
          color: #0efeff;
        }
        .paragraph-detail {
          text-indent: 2em;
        }
      }
      .echart {
        padding: 5px 160px;
        height: 300px;
        > div {
          height: 100%;
        }
        > .pie {
          width: 50%;
          margin: 0 auto 30px;
        }
      }
    }
  }
}
.table-wrap {
  width: 100%;
  padding-top: 10px;
  .table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    thead {
      th {
        height: 39px;
        line-height: 39px;
        background: rgba(51, 107, 218, 1);
        font-weight: 500;
        word-break: break-all;
        padding: 0 5px;
      }
    }
    tbody {
      tr:nth-of-type(odd) {
        background: rgba(255, 255, 255, 0.1);
      }
      td {
        font-weight: 300;
        text-align: center;
        word-break: break-all;
        line-height: 40px;
      }
    }
  }
}
.table-wrap.border {
  > .table > tbody > tr > td {
    border-right: 1px solid rgba(53, 105, 156, 1);
    border-bottom: 1px solid rgba(53, 105, 156, 1);
  }
  > .table > tbody > tr > td:last-of-type {
    border-right: none;
  }
}
.table-wrap.nobg {
  > .table {
    > tbody {
      > tr:nth-of-type(odd) {
        background: none;
      }
    }
  }
}
.canvas {
  padding-bottom: 30px;
  overflow: visible;
  width: 100%;
  height: auto;
  background: #0e3166;
  background-size: 100% 100%;
}
</style>
