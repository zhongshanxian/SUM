<div class="layer">
	<!--在组件的摸板中插入img 最好使用绝对路径，若使用相对路径，采用require-->
	<img src="${ require('../../assets/logo.png') }" />
	<div>this is <%= name %></div>
	<% for(var i=0; i<arr.length; i++) { %>
		<%= arr[i] %>
	<% } %>
</div>