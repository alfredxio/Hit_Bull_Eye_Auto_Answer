document.addEventListener("DOMContentLoaded", function () {
  var checkPageButton = document.getElementById("submit");
  checkPageButton.addEventListener("click", btnClick);

  async function performTask(content, ques, qno, sec) {
    console.log("target injected inside");
    var mps = new Map();
    var arr = content.split("\n");
    var key = "";
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i]
        .replaceAll(" ", "")
        .replaceAll("-", "")
        .replaceAll("[", "")
        .replaceAll("]", "");
      //console.log(arr[i]);

      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] >= "0" && arr[i][j] <= "9") {
          key += arr[i][j];
        } else {
          mps.set(key, arr[i][j]);
          key = "";
        }
      }
    }

    console.log(mps);

    // async function sleep(ms) {
    //  return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    var an = "";
    for (var i = qno - 1; i < ques; i++) {
      an = "" + mps.get((i + 1).toString()) + "_" + (i + 1).toString();
      console.log(an);
      //await sleep(sec * 1000);
      await new Promise(r => setTimeout(r, sec * 1000));
      console.log("rolling");
      document.getElementById(an).click();
      await new Promise(r => setTimeout(r, 600));
      document.getElementsByClassName('button savenext')[0].click();
    }
  }

  function btnClick() {
    console.log("logged");

    var content = document.getElementById("ans").value;
    var ques = document.getElementById("ques").value;
    var qno = document.getElementById("qno").value;
    var sec = document.getElementById("secs").value;
    console.log(qno);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("target injected");
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: performTask,
          args: [content, ques, qno, sec],
        },
        () => {
          console.log("injection complete");
        }
      );
    });
  }
});