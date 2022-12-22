#!/bin/bash
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

directory=/home/tomas/dev/food
browser=firefox
jira_url=https://tom-fitness.atlassian.net/jira/software/projects/FIT/boards/2

function jira
{
  $browser $jira_url &>/dev/null &
}

function vs-code
{
  if [ -d $directory/$1 ]
  then
    code $directory/$1
  else
    echo "Error: directory $directory/$1 does not exist"
  fi
}

function run
{
  if [ -d $directory/$1 ]
  then
    cd $directory/$1
    npm run dev
  else
    echo "Error: directory $directory/$1 does not exist"
  fi
}

function open-directory
{
  if [ -d $directory/$1 ]
  then
    nautilus $directory/$1 &
  else
    echo "Error: directory $directory/$1 does not exist"
  fi
}

function browse-jira
{
  $browser https://tom-fitness.atlassian.net/browse/FIT-$1 &
}

while getopts "j:lc:e:r:hd:t:n" option; do
  case $option in      
    h) 
      cat $directory/getback-help.txt
      exit;;

    j) # launch jira
      jira $OPTARG
      exit;;
    
    c) 
      vs-code $OPTARG
      exit;;

    r) 
      run $OPTARG
      exit;;

    l)
      ls -1 $directory
      exit;;

    t)
      browse-jira $OPTARG
      exit;;

    d)
      vs-code $OPTARG
      run $OPTARG
      exit;;

    n)
      code $directory/docs/notes
      exit;;

    \?) 
      echo "Error: invalid option"
      exit;;
  esac
done

