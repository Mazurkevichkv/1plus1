$(document).ready(function(){
	TableNavigation.constructor();
	Pagination.constructor();
	createVideoBlocks()
    $('.next').on('click', function(){ TableNavigation.next(); Pagination.next(); });
    $('.prev').on('click', function(){ TableNavigation.prev(); Pagination.prev(); });
    $('#search img, #search span, .search').on('click', function(){var curr=$('#search').find('input').slideToggle(); })
})
// createVideoBlocks() виконує функцію конструктора "класу". За допомогою  createVideoBlocks() створюється масив об'єктів. 
// код не важко змінити для отримання даних з JSON.
// таблиці заповнюються відповідними відео-блоками, залежно від створенного каркасу
function createVideoBlocks(){
	        function Types(image,border,textMain,text,extraText){
			   this.image=image;
			   this.border=border;
			   this.textMain=textMain;
			   this.text=text;
			   this.extraText=extraText;
            }
    	    var VideoTypes=[];
			VideoTypes[1]=new Types('url(img/1.png)','#BE2520','Величне століття','Сезон 4, серія 724','Нові серії');
            VideoTypes[2]=new Types('url(img/2.png)','#BE2520','Байєр/Іскра','Єврокубок','');
            VideoTypes[3]=new Types('url(img/3.png)','#AA2390','Онлайн Любов','Серія 15','');
            VideoTypes[4]=new Types('url(img/4.png)','#BE2520','ТСН','Новини','');
            VideoTypes[5]=new Types('url(img/5.png)','#AA2390','Фреймут','Львів','');
            VideoTypes[6]=new Types('url(img/6.png)','#FFCC30','Севілія/Дніпро','Єврокубок','');
            VideoTypes[7]=new Types('url(img/7.png)','#00727B','','','');
            VideoTypes[8]=new Types('url(img/8.png)','#AA2390','Пустий Париж','Фільм','');
            VideoTypes[9]=new Types('url(img/9.png)','#FFCC30','Меркель','Фільм','');
            VideoTypes[10]=new Types('url(img/10.png)','#AA2390','Файна Юкрайна','Серія 4','');
            VideoTypes[11]=new Types('url(img/11.png)','#00727B','Євромайдан','Фільм','');
		    for (var i=1; i<=11; i++)
				{
					var currImg=$('[data-img='+i+']');
					currImg.css({'background-image': VideoTypes[i].image , 'border-bottom':'10px solid '+VideoTypes[i].border})
					if (VideoTypes[i].extraText=='')
					       currImg.append('<h1>'+VideoTypes[i].textMain+'</h1><h2>'+VideoTypes[i].text+'</h2>')
					else
					       currImg.append('<h3>'+VideoTypes[i].extraText+'</h3><h1>'+VideoTypes[i].textMain+'</h1><h2>'+VideoTypes[i].text+'</h2>');
				}			
}       

//навігація з усією логікою винесена в окремий об'єкт
var TableNavigation={
	active: 1,
	constructor: function(){
		this.setAmount();
        this.setActiveDomElem();
	},
	setActiveDomElem: function(){this.activeDomElem=$('[data-t-number='+this.active+']'); },
	setAmount: function(){this.amount=$('#video-bann').find('table:last').data('t-number')},
	setActive: function(){      this.activeDomElem.hide().removeClass('active');
		                        this.setActiveDomElem();
		                        this.activeDomElem.show().addClass('active');
		                       },
	next: function(){ this.active= (this.active != this.amount ) ? this.active+1 : 1;
		                   this.setActive();
		                 },
	prev: function(){ this.active= (this.active != 1 ) ? this.active-1 : this.amount;
		                   this.setActive();
		                 }	                 
}
//аналогічно пагінація винесена в окремий об'єкт
//для об'єктів TableNavigation та Pagination можна зробити рефакторінг зі створенням прототипного об'єкту. Але я залишила їх незміненними для наглядності
var Pagination={
	active: 1,
	constructor: function(){
		this.setAmount();
		this.createPagination();
        this.setActiveDomElem();  
	},
	setAmount: function(){this.amount=TableNavigation.amount},
	setActiveDomElem: function(){this.activeDomElem=$('#navig-circle').find('span:eq('+(this.active-1)+')'); },
    createPagination: function(){$('#navig-circle').append('<span class="lighted"></span>')
							    for (var i=2; i<=this.amount; i++)
							    {
							    	$('#navig-circle').append('<span></span>')
							    }
						     },
	setActive: function(){ this.activeDomElem.removeClass('lighted');
	                       this.setActiveDomElem();
	                       this.activeDomElem.addClass('lighted');
	                     },					    
    next: function(){this.active= (this.active !=  this.amount ) ? this.active+1 : 1; 
    	             this.setActive();
                    },
    prev: function(){ this.active= (this.active != 1 ) ? this.active-1 : this.amount;
		                   this.setActive();
		            }	 
}