# react OX遊戲(官網教學)
## 重點整理
1. create by npx create-react-app dirname
2. class Square extends React.Component
3. render function
4. props來傳組件值
5. 語法是jsx
6. 所有的 React component class，凡是有 constructor 的，都應該要從呼叫 super(props) 開始。
7. props也可以傳入onClick的function
8. 修改state的值必須透過setState，setState可以設定多個值
9. 修改array時，先使用slice建立一個array的copy
10. Immutability(不可變性)
	偵測改變
	在可變更的 object 中偵測改變是很困難的，因為這些改變是直接的。如果要偵測改變的話，我們需要比較這個可變更的 object 和它之前的 copy，並且走訪整個 object tree。
	相較之下，在不可變更的 object 中偵測改變就容易多了。如果某個不可變更 object 和之前不一樣，那麼這個 object 就已經被改變了。


	不可變性最主要的優點在於它幫助你在 React 中建立 pure component。我們能很容易決定不可變的資料中是否有任何改變，這幫助 React 決定某個 component 是否需要重新 render。
11. Function Component，當我們要寫只包含 render 方法且沒有自己 state 的 component 時，function component 是一種很簡易的寫法。
	其中this記得拿掉
12. 實作時光旅行
13. 每一個 array 或 iterator 中的 child 必須要有一個獨特的「key」屬性。Key 不需要是全域內獨特的值。它們只需要是在 component 和它們的 sibling 間是獨特的即可。

## 附加功能
1. 在歷史動作列表中，用（欄，列）的格式來顯示每個動作的位置。
2. 在動作列表中，將目前被選取的項目加粗。
3. 改寫 Board，使用兩個 loop 建立方格而不是寫死它。
4. 加上一個切換按鈕讓你可以根據每個動作由小到大、由大到小來排序。
5. 當勝負揭曉時，把連成一條線的那三個方格凸顯出來。
6. 當沒有勝負時，顯示遊戲結果為平手。