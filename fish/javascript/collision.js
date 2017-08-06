function momFruitCollision(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++)
		{
			if(fruit.alive[i])
			{
				var long=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(long<900)
				{
					fruit.dead(i);
					wave.bornType="mom";
					wave.born(fruit.x[i],fruit.y[i]);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount>7)
					{
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue")
					{
						data.double=2;
					}
				}
			}
		}
	}
}

//mom baby collision
function momBabyCollision(){
	var long=calLength2(mom.x,mom.y,baby.x,baby.y);
	if(!data.gameOver)
	{
		if(long<900)
		{
			//baby recover
			if(mom.momBodyCount>0)
			{
				baby.babyBodyCount=0;//初始状态
				wave.bornType="baby";
				wave.born(baby.x,baby.y);
			}
			data.addScore();
			mom.momBodyCount=0;
		}
	}
}