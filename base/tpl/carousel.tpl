<div id="car" class="carousel slide" data-interval="false" data-ride="carousel" onclick="a4pp_carousel('#car');" style='background:black'>
  <!-- Indicators -->
  <ol class="carousel-indicators">
	 <% for(var i = 0; i < this.items.length;i++){ %>
     <li data-target="#car" data-slide-to="<% i %>" <% (i == 0) ? 'class="active"' : "" %>></li>
     <% } %>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
	<% for(var i = 0; i < this.items.length;i++){ %>
    <div class="item  <% (i == 0) ? 'active' : "" %>">
		<div class="embed-responsive embed-responsive-16by9">
			<div class="embed-responsive-item text-center">
				<img src="<% this.items[i].src %>" style='height:100%' alt="...">
				<div class="carousel-caption">
					<% this.items[i].title %>
				</div>
			</div>
		</div>
	</div>
    <% } %>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#car" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#car" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>
  
<a href="#" onclick='history.back();return false' style='position:fixed;top:70px;left:10px;color:#fff;width:50px;height:50px;font-size:36px;'><span class='glyphicon glyphicon-remove'></span></a>
