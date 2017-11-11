<template>
  <div class="page-house-index">
      <Tab @change="refresh" />
      <div class="houses">
          <div class="room" v-for="room in rooms">
              <p>{{room.title}}</p>
              <div class="cells">
                  <House v-for="(cell, index) in room.cells" :key="index" class="cell" />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
    import { Tab, House } from "~/modules/house";
    export default {
      components: {
        Tab,
        House
      },
      data() {
        return {
          rooms: [
            { title: "保利香槟国际", cells: [1, 2, 3, 4] },
            { title: "保利香槟国际", cells: [1, 2] }
          ]
        };
      },
      methods: {
        refresh() {}
      }
    };
</script>

<style lang="less" scoped>
    .page-house-index {
      display: flex;

      .houses {
        margin-left: 30px;
        flex: 1;
      }

      .room + .room {
        margin-top: 20px;
      }

      .room {
        width: 100%;
        height: 180px;
        background-color: #fff;
        box-shadow: 0 0 4px #ddd;
        border-radius: 2px;
        color: @dark;
        padding: 20px;

        .cells {
          display: flex;
          margin-top: 20px;

          .cell {
            margin-right: 20px;
          }
        }
      }
    }
</style>

